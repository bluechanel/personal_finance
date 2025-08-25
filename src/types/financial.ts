// 财务数据类型定义
export interface FinancialData {
  // 资产类
  ownerHouseValue: number;      // 自用住房价值
  investmentProperty: number;   // 投资房产价值
  carValue: number;            // 自用汽车价值
  stocksValue: number;         // 股票市值
  fundsValue: number;          // 基金市值
  cashAndDeposits: number;     // 现金及存款
  pensionAccount: number;      // 养老金账户余额
  
  // 负债类
  mortgageBalance: number;     // 房贷余额
  carLoanBalance: number;      // 车贷余额
  creditCardDebt: number;      // 信用卡欠款
  consumerLoans: number;       // 消费贷款/花呗借呗
  
  // 收入/支出类
  annualSalary: number;        // 每年工资收入
  annualOtherIncome: number;   // 每年其他收入（租金/副业等）
  annualLivingExpenses: number; // 每年日常开销
  annualMortgagePayment: number; // 每年房贷还款额
  annualCarPayment: number;    // 每年车贷还款额
  annualInvestmentIncome: number; // 每年投资收益（分红/利息/租金/股票等）
  emergencyFund: number;       // 家庭应急资金（银行存款/货币基金）
}

// 财务分析结果
export interface FinancialAnalysis {
  // 基础财务指标
  netWorth: number;             // 净资产 = 总资产 - 总负债
  totalAssets: number;          // 总资产
  totalDebt: number;            // 总负债
  savingsRate: number;          // 储蓄率 = (年度收入 - 年度支出) ÷ 年度收入
  debtToIncomeRatio: number;    // 负债收入比 (DTI) = 年度偿债支出 ÷ 年度收入
  emergencyFundCoverage: number; // 应急储备覆盖率 = 家庭应急资金 ÷ 月度生活费用 (月数)
  
  // 资产结构分析
  assetStructure: {
    liquidAssets: number;       // 流动资产（现金+应急资金）
    investmentAssets: number;   // 投资性资产（投资房产+股票+基金+养老金）
    personalAssets: number;     // 自用性资产（自用住房+汽车）
    liquidPercentage: number;   // 流动资产占比
    investmentPercentage: number; // 投资性资产占比
    personalPercentage: number; // 自用性资产占比
  };
  
  // 负债结构分析
  debtStructure: {
    shortTermDebt: number;      // 短期负债（信用卡+消费贷）
    longTermDebt: number;       // 长期负债（房贷+车贷）
    shortTermPercentage: number; // 短期负债占比
    longTermPercentage: number; // 长期负债占比
  };
  
  // 财务比率
  financialRatios: {
    currentRatio: number;       // 流动比率 = 流动资产 ÷ 短期负债
    quickRatio: number;         // 速动比率 = 流动资产 ÷ 短期负债（简化版）
    debtToAssetRatio: number;   // 资产负债率 = 总负债 ÷ 总资产
    assetReturnRate: number;    // 资产收益率 (ROA) = 年度投资性收入 ÷ 总资产
  };
  
  // 年度数据
  annualData: {
    totalIncome: number;        // 年度总收入
    totalExpenses: number;      // 年度总支出
    debtPayments: number;       // 年度偿债支出
    netSavings: number;         // 年度净储蓄
  };
  
  // 财务健康评级
  healthScore: number;          // 财务健康评分 (0-100)
  healthLevel: 'excellent' | 'good' | 'fair' | 'poor'; // 财务健康等级
  
  // 建议和分析
  recommendations: string[];    // 理财建议
  strengths: string[];          // 财务优势
  improvements: string[];       // 改进建议
  riskFactors: string[];        // 风险因素
}

// 财务指标说明
export interface FinancialMetric {
  name: string;              // 指标名称
  actualValue: number;       // 实际值
  targetValue: string;       // 目标值
  description: string;       // 指标说明
  status: 'good' | 'warning' | 'danger'; // 状态
  explanation: string;       // 详细解释
}

// 图表数据类型
export interface ChartData {
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}