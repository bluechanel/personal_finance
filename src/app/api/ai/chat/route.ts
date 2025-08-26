import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import { openai, FINANCIAL_ANALYSIS_SYSTEM_PROMPT, formatFinancialDataForAI } from '@/lib/openai';
import { FinancialData } from '@/types/financial';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  financialData?: FinancialData;
  includeFinancialData?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未提供有效的认证令牌' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: '无效的认证令牌' },
        { status: 401 }
      );
    }

    // 解析请求体
    const body: ChatRequest = await request.json();
    const { messages, financialData, includeFinancialData } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '无效的消息格式' },
        { status: 400 }
      );
    }

    // 构建发送给GPT的消息数组
    const gptMessages: ChatMessage[] = [
      {
        role: 'system',
        content: FINANCIAL_ANALYSIS_SYSTEM_PROMPT
      }
    ];

    // 如果需要包含财务数据，添加财务数据到对话上下文
    if (includeFinancialData && financialData) {
      gptMessages.push({
        role: 'system',
        content: `以下是用户的财务数据，请基于这些数据为用户提供个性化的财务建议：\n\n${formatFinancialDataForAI(financialData)}`
      });
    }

    // 添加用户的对话历史
    gptMessages.push(...messages);

    // 调用OpenAI API - 启用流式输出
    const stream = await openai.chat.completions.create({
      model: 'glm-4.5-flash',
      messages: gptMessages,
      max_tokens: 1500,
      temperature: 0.7,
      stream: true,
    });

    // 创建流式响应
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              // 发送流式数据
              const data = `data: ${JSON.stringify({ content })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          // 发送结束标志
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('AI聊天API错误:', error);
    
    // 处理OpenAI API特定错误
    if (error instanceof Error) {
      if (error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'OpenAI API配额不足，请检查您的账户余额' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('invalid_api_key')) {
        return NextResponse.json(
          { error: 'OpenAI API密钥无效，请检查环境变量设置' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: '处理AI请求时发生错误，请稍后重试' },
      { status: 500 }
    );
  }
}