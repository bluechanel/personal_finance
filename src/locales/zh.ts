// 中文语言配置
export const zh = {
  // 导航和通用
  nav: {
    title: '个人财务分析工具',
    languageToggle: 'Language',
    subtitle: '轻松了解您的财务状况，获得专业的理财建议',
  },
  
  // 表单相关
  form: {
    title: '财务信息输入',
    submitButton: '🔄 分析我的财务状况',
    
    // 资产类
    assets: {
      title: '💰 资产类',
      ownerHouseValue: '自用住房价值',
      investmentProperty: '投资房产价值',
      carValue: '自用汽车价值',
      stocksValue: '股票市值',
      fundsValue: '基金市值',
      cashAndDeposits: '现金及存款',
      pensionAccount: '养老金账户余额',
      emergencyFund: '家庭应急资金',
    },
    
    // 负债类
    debts: {
      title: '📋 负债类',
      mortgageBalance: '房贷余额',
      carLoanBalance: '车贷余额',
      creditCardDebt: '信用卡欠款',
      consumerLoans: '消费贷款/花呗借呗',
    },
    
    // 收入支出类
    incomeExpense: {
      title: '💼 收入/支出类',
      annualSalary: '每年工资收入',
      annualOtherIncome: '每年其他收入',
      annualOtherIncomeDesc: '(租金/副业等)',
      annualLivingExpenses: '每年日常开销',
      annualMortgagePayment: '每年房贷还款额',
      annualCarPayment: '每年车贷还款额',
      annualInvestmentIncome: '每年投资收益',
      annualInvestmentIncomeDesc: '(分红/利息/租金/股票等)',
    },
    
    // 单位和占位符
    unit: '元',
    placeholders: {
      house: '如：300',
      investment: '如：150',
      car: '如：20',
      stocks: '如：50',
      funds: '如：30',
      cash: '如：10',
      pension: '如：25',
      emergency: '如：5',
      mortgage: '如：200',
      carLoan: '如：15',
      creditCard: '如：2',
      consumer: '如：3',
      salary: '如：30',
      otherIncome: '如：5',
      living: '如：20',
      mortgagePayment: '如：12',
      carPayment: '如：3',
      investmentIncome: '如：4',
    },
  },
  
  // 分析结果相关
  results: {
    title: '📈 财务分析结果',
    resetButton: '🔄 重新分析',
    healthScore: '财务健康评分',
    healthLevels: {
      excellent: '优秀',
      good: '良好',
      fair: '一般',
      poor: '需改善',
    },
    
    // 关键指标表格
    keyMetrics: {
      title: '📊 关键财务指标',
      headers: {
        name: '指标名称',
        actual: '实际值',
        target: '目标值',
        status: '状态',
        description: '说明',
      },
      statuses: {
        good: '达标',
        warning: '一般',
        danger: '待改善',
      },
    },
    
    // 指标名称
    metrics: {
      netWorth: '净资产',
      savingsRate: '储蓄率',
      debtToIncomeRatio: '负债收入比',
      emergencyFundCoverage: '应急储备覆盖率',
    },
    
    // 图表标题
    charts: {
      assetStructure: '🥧 资产结构分析',
      incomeExpense: '📊 收入支出对比',
      targetStatus: '🎯 指标达标情况',
      financialRatios: '📈 详细财务比率',
    },
    
    // 资产结构标签
    assetTypes: {
      liquidAssets: '流动资产',
      investmentAssets: '投资性资产',
      personalAssets: '自用性资产',
    },
    
    // 收入支出标签
    incomeExpenseTypes: {
      totalIncome: '年度收入',
      totalExpenses: '年度支出',
      netSavings: '净储蓄',
    },
    
    // 财务比率标签
    ratioTypes: {
      currentRatio: '流动比率',
      currentRatioDesc: '流动资产/短期负债',
      debtToAssetRatio: '资产负债率',
      debtToAssetRatioDesc: '总负债/总资产',
      assetReturnRate: '资产收益率',
      assetReturnRateDesc: '投资收益/总资产',
      emergencyFundCoverage: '应急储备覆盖率',
      emergencyFundCoverageDesc: '应急基金/月度生活费',
    },
    
    // 达标情况标签
    targetLabels: {
      excellent: '优秀',
      good: '良好',
      poor: '待改善',
    },
    
    // 建议和分析
    analysis: {
      strengths: '✅ 财务优势',
      improvements: '💡 改进建议',
      recommendations: '💰 理财建议',
      risks: '⚠️ 风险提示',
      noContent: {
        strengths: '继续努力，建立财务优势！',
        improvements: '目前财务状况良好！',
        recommendations: '暂无特殊建议，保持当前状态！',
        risks: '目前未发现明显风险因素！',
      },
    },
  },
  
  // 月份单位
  monthUnit: '月',
  
  // 页脚信息
  footer: {
    privacyNotice: '💡 提示：所有数据仅在本地处理，不会上传到服务器',
  },
  
  // 登录相关
  auth: {
    signIn: {
      button: '登录',
      title: '登录您的账户',
      subtitle: '使用社交账户快速登录',
      continueWith: '继续使用',
      signing: '登录中...',
      terms: '登录即表示您同意我们的服务条款和隐私政策',
    },
    signOut: {
      button: '退出登录',
      confirm: '确定要退出登录吗？',
    },
    register: {
      title: '创建新账户',
      button: '注册',
      registering: '注册中...',
    },
    form: {
      username: '用户名',
      password: '密码',
      email: '邮箱',
      optional: '可选',
      usernamePlaceholder: '请输入用户名',
      passwordPlaceholder: '请输入密码',
      emailPlaceholder: '请输入邮箱地址',
    },
    switchToRegister: '没有账户？点击注册',
    switchToLogin: '已有账户？点击登录',
    privacy: '所有数据均存储在您的本地设备中，确保您的隐私安全',
    profile: {
      title: '个人资料',
      myData: '我的财务数据',
      settings: '账户设置',
    },
    error: {
      title: '登录失败',
      default: '登录时发生未知错误',
      configuration: '服务器配置错误',
      accessDenied: '访问被拒绝',
      verification: '验证失败',
      oauthSignin: 'OAuth 登录失败',
      oauthCallback: 'OAuth 回调失败',
      oauthCreateAccount: '创建 OAuth 账户失败',
      emailCreateAccount: '邮箱创建账户失败',
      callback: '登录回调错误',
      accountNotLinked: '该邮箱已被其他登录方式使用',
      emailSignin: '邮箱登录失败',
      credentialsSignin: '登录凭据无效',
      sessionRequired: '需要登录',
      tryAgain: '重新登录',
      backHome: '返回首页',
      code: '错误代码',
    },
  },
};

export type Locale = typeof zh;