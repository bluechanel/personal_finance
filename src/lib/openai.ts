import OpenAI from 'openai';
import { FinancialData } from '@/types/financial';

// 检查必要的环境变量
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OPENAI_API_KEY 环境变量未设置。请在 .env.local 文件中添加您的OpenAI API密钥。'
  );
}

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

export { openai };

// AI财务分析助手的系统提示词
export const FINANCIAL_ANALYSIS_SYSTEM_PROMPT = `你是一位专业的个人财务分析师和理财顾问。请根据用户提供的财务数据，为用户提供专业、实用的财务建议。

请遵循以下准则：

1. **专业性**：基于财务分析理论和最佳实践提供建议
2. **个性化**：根据用户的具体财务状况定制建议
3. **实用性**：提供可操作、可执行的具体建议
4. **风险意识**：适当提醒投资风险和财务风险
5. **通俗易懂**：避免过多专业术语，用简单明了的语言解释

您可以帮助用户：
- 分析个人财务健康状况
- 制定储蓄和投资策略
- 优化资产配置
- 规划应急基金
- 债务管理建议
- 理财目标设定
- 风险评估和管理

请始终保持客观、专业的态度，为用户提供有价值的财务指导。`;

// 格式化财务数据为GPT可理解的文本
export function formatFinancialDataForAI(data: FinancialData): string {
  return `
用户财务数据概览：

**收入情况**：
- 年薪资收入：${(data.annualSalary || 0).toLocaleString()} 元
- 年其他收入：${(data.annualOtherIncome || 0).toLocaleString()} 元
- 年投资收益：${(data.annualInvestmentIncome || 0).toLocaleString()} 元

**资产情况**：
- 现金和储蓄：${(data.cashAndDeposits || 0).toLocaleString()} 元
- 应急储备资金：${(data.emergencyFund || 0).toLocaleString()} 元
- 股票市值：${(data.stocksValue || 0).toLocaleString()} 元
- 基金市值：${(data.fundsValue || 0).toLocaleString()} 元
- 养老金账户：${(data.pensionAccount || 0).toLocaleString()} 元
- 自用住房价值：${(data.ownerHouseValue || 0).toLocaleString()} 元
- 投资房产价值：${(data.investmentProperty || 0).toLocaleString()} 元
- 自用汽车价值：${(data.carValue || 0).toLocaleString()} 元

**负债情况**：
- 房贷余额：${(data.mortgageBalance || 0).toLocaleString()} 元
- 车贷余额：${(data.carLoanBalance || 0).toLocaleString()} 元
- 信用卡欠款：${(data.creditCardDebt || 0).toLocaleString()} 元
- 消费贷款：${(data.consumerLoans || 0).toLocaleString()} 元

**支出情况**：
- 年日常开销：${(data.annualLivingExpenses || 0).toLocaleString()} 元
- 年房贷还款：${(data.annualMortgagePayment || 0).toLocaleString()} 元
- 年车贷还款：${(data.annualCarPayment || 0).toLocaleString()} 元

**财务指标**：
- 总资产：${((data.ownerHouseValue || 0) + (data.investmentProperty || 0) + (data.carValue || 0) + (data.stocksValue || 0) + (data.fundsValue || 0) + (data.cashAndDeposits || 0) + (data.pensionAccount || 0)).toLocaleString()} 元
- 总负债：${((data.mortgageBalance || 0) + (data.carLoanBalance || 0) + (data.creditCardDebt || 0) + (data.consumerLoans || 0)).toLocaleString()} 元
- 年度总收入：${((data.annualSalary || 0) + (data.annualOtherIncome || 0) + (data.annualInvestmentIncome || 0)).toLocaleString()} 元
- 年度总支出：${((data.annualLivingExpenses || 0) + (data.annualMortgagePayment || 0) + (data.annualCarPayment || 0)).toLocaleString()} 元
`;
}