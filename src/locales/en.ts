import { Locale } from './zh';

// 英文语言配置
export const en: Locale = {
  // 导航和通用
  nav: {
    title: 'Personal Finance Analysis Tool',
    languageToggle: '语言',
    subtitle: 'Easily understand your financial status and get professional financial advice',
  },
  
  // 表单相关
  form: {
    title: 'Financial Information Input',
    submitButton: '🔄 Analyze My Financial Status',
    
    // 资产类
    assets: {
      title: '💰 Assets',
      ownerHouseValue: 'Primary Residence Value',
      investmentProperty: 'Investment Property Value',
      carValue: 'Vehicle Value',
      stocksValue: 'Stock Portfolio Value',
      fundsValue: 'Mutual Funds Value',
      cashAndDeposits: 'Cash & Bank Deposits',
      pensionAccount: 'Retirement Account Balance',
      emergencyFund: 'Emergency Fund',
    },
    
    // 负债类
    debts: {
      title: '📋 Liabilities',
      mortgageBalance: 'Mortgage Balance',
      carLoanBalance: 'Auto Loan Balance',
      creditCardDebt: 'Credit Card Debt',
      consumerLoans: 'Consumer Loans/Personal Debt',
    },
    
    // 收入支出类
    incomeExpense: {
      title: '💼 Income/Expenses',
      annualSalary: 'Annual Salary',
      annualOtherIncome: 'Annual Other Income',
      annualOtherIncomeDesc: '(Rental/Side Business etc.)',
      annualLivingExpenses: 'Annual Living Expenses',
      annualMortgagePayment: 'Annual Mortgage Payment',
      annualCarPayment: 'Annual Car Payment',
      annualInvestmentIncome: 'Annual Investment Income',
      annualInvestmentIncomeDesc: '(Dividends/Interest/Rental/Stocks etc.)',
    },
    
    // 单位和占位符
    unit: '10k RMB',
    placeholders: {
      house: 'e.g.: 300',
      investment: 'e.g.: 150',
      car: 'e.g.: 20',
      stocks: 'e.g.: 50',
      funds: 'e.g.: 30',
      cash: 'e.g.: 10',
      pension: 'e.g.: 25',
      emergency: 'e.g.: 5',
      mortgage: 'e.g.: 200',
      carLoan: 'e.g.: 15',
      creditCard: 'e.g.: 2',
      consumer: 'e.g.: 3',
      salary: 'e.g.: 30',
      otherIncome: 'e.g.: 5',
      living: 'e.g.: 20',
      mortgagePayment: 'e.g.: 12',
      carPayment: 'e.g.: 3',
      investmentIncome: 'e.g.: 4',
    },
  },
  
  // 分析结果相关
  results: {
    title: '📈 Financial Analysis Results',
    resetButton: '🔄 Reanalyze',
    healthScore: 'Financial Health Score',
    healthLevels: {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Needs Improvement',
    },
    
    // 关键指标表格
    keyMetrics: {
      title: '📊 Key Financial Metrics',
      headers: {
        name: 'Metric Name',
        actual: 'Actual Value',
        target: 'Target Value',
        status: 'Status',
        description: 'Description',
      },
      statuses: {
        good: 'Good',
        warning: 'Fair',
        danger: 'Poor',
      },
    },
    
    // 指标名称
    metrics: {
      netWorth: 'Net Worth',
      savingsRate: 'Savings Rate',
      debtToIncomeRatio: 'Debt-to-Income Ratio',
      emergencyFundCoverage: 'Emergency Fund Coverage',
    },
    
    // 图表标题
    charts: {
      assetStructure: '🥧 Asset Structure Analysis',
      incomeExpense: '📊 Income vs Expenses',
      targetStatus: '🎯 Target Achievement Status',
      financialRatios: '📈 Detailed Financial Ratios',
    },
    
    // 资产结构标签
    assetTypes: {
      liquidAssets: 'Liquid Assets',
      investmentAssets: 'Investment Assets',
      personalAssets: 'Personal Assets',
    },
    
    // 收入支出标签
    incomeExpenseTypes: {
      totalIncome: 'Annual Income',
      totalExpenses: 'Annual Expenses',
      netSavings: 'Net Savings',
    },
    
    // 财务比率标签
    ratioTypes: {
      currentRatio: 'Current Ratio',
      currentRatioDesc: 'Liquid Assets/Short-term Debt',
      debtToAssetRatio: 'Debt-to-Asset Ratio',
      debtToAssetRatioDesc: 'Total Debt/Total Assets',
      assetReturnRate: 'Asset Return Rate',
      assetReturnRateDesc: 'Investment Income/Total Assets',
      emergencyFundCoverage: 'Emergency Fund Coverage',
      emergencyFundCoverageDesc: 'Emergency Fund/Monthly Living Expenses',
    },
    
    // 达标情况标签
    targetLabels: {
      excellent: 'Excellent',
      good: 'Good',
      poor: 'Needs Improvement',
    },
    
    // 建议和分析
    analysis: {
      strengths: '✅ Financial Strengths',
      improvements: '💡 Areas for Improvement',
      recommendations: '💰 Financial Recommendations',
      risks: '⚠️ Risk Factors',
      noContent: {
        strengths: 'Keep working to build financial strengths!',
        improvements: 'Current financial status is good!',
        recommendations: 'No specific recommendations at this time, maintain current status!',
        risks: 'No significant risk factors identified currently!',
      },
    },
  },
  
  // 月份单位
  monthUnit: 'months',
  
  // 页脚信息
  footer: {
    privacyNotice: '💡 Note: All data is processed locally and will not be uploaded to servers',
  },
};