import { FinancialData, FinancialAnalysis, FinancialMetric } from '@/types/financial';
import { Locale } from '@/locales';
import {
  generateRecommendations as generateMultilingualRecommendations,
  generateStrengths as generateMultilingualStrengths,
  generateImprovements as generateMultilingualImprovements,
  generateRiskFactors as generateMultilingualRiskFactors
} from './multilingual-recommendations';

/**
 * 计算财务分析结果
 */
export function calculateFinancialAnalysis(data: FinancialData, t?: Locale): FinancialAnalysis {
  // 1. 资产映射计算
  const totalAssets = data.ownerHouseValue + data.investmentProperty + data.carValue + 
                     data.stocksValue + data.fundsValue + data.cashAndDeposits + data.pensionAccount + data.emergencyFund;
  
  const totalDebt = data.mortgageBalance + data.carLoanBalance + 
                   data.creditCardDebt + data.consumerLoans;
  
  const liquidAssets = data.cashAndDeposits + data.emergencyFund;
  const investmentAssets = data.investmentProperty + data.stocksValue + 
                          data.fundsValue + data.pensionAccount;
  const personalAssets = data.ownerHouseValue + data.carValue;
  
  const shortTermDebt = data.creditCardDebt + data.consumerLoans;
  const longTermDebt = data.mortgageBalance + data.carLoanBalance;
  
  // 2. 基础指标计算
  const netWorth = totalAssets - totalDebt;
  const annualIncome = data.annualSalary + data.annualOtherIncome;
  const annualExpenses = data.annualLivingExpenses + data.annualMortgagePayment + data.annualCarPayment;
  // 修正：年度债务支付应包含所有债务的还款，按一般比例估算信用卡和消费贷的年度还款
  const estimatedCreditCardPayment = data.creditCardDebt * 0.3; // 假设年还款30%
  const estimatedConsumerLoanPayment = data.consumerLoans * 0.4; // 假设年还款40%
  const annualDebtPayments = data.annualMortgagePayment + data.annualCarPayment + 
                            estimatedCreditCardPayment + estimatedConsumerLoanPayment;
  const annualNetSavings = annualIncome - annualExpenses;
  
  // 3. 财务比率计算
  const savingsRate = annualIncome > 0 ? (annualNetSavings / annualIncome) * 100 : 0;
  const debtToIncomeRatio = annualIncome > 0 ? (annualDebtPayments / annualIncome) * 100 : 0;
  // 修正：应急基金覆盖率应该基于月度生活费用而不是年度总支出
  const monthlyLivingExpenses = data.annualLivingExpenses / 12;
  const emergencyFundCoverage = monthlyLivingExpenses > 0 ? (data.emergencyFund / monthlyLivingExpenses) : 0;
  
  const currentRatio = shortTermDebt > 0 ? liquidAssets / shortTermDebt : 999;
  const quickRatio = currentRatio; // 简化版，与流动比率相同
  const debtToAssetRatio = totalAssets > 0 ? (totalDebt / totalAssets) * 100 : 0;
  const assetReturnRate = totalAssets > 0 ? (data.annualInvestmentIncome / totalAssets) * 100 : 0;
  
  // 4. 资产结构分析
  const assetStructure = {
    liquidAssets,
    investmentAssets,
    personalAssets,
    liquidPercentage: totalAssets > 0 ? (liquidAssets / totalAssets) * 100 : 0,
    investmentPercentage: totalAssets > 0 ? (investmentAssets / totalAssets) * 100 : 0,
    personalPercentage: totalAssets > 0 ? (personalAssets / totalAssets) * 100 : 0
  };
  
  // 5. 负债结构分析
  const debtStructure = {
    shortTermDebt,
    longTermDebt,
    shortTermPercentage: totalDebt > 0 ? (shortTermDebt / totalDebt) * 100 : 0,
    longTermPercentage: totalDebt > 0 ? (longTermDebt / totalDebt) * 100 : 0
  };
  
  // 6. 财务比率
  const financialRatios = {
    currentRatio,
    quickRatio,
    debtToAssetRatio,
    assetReturnRate
  };
  
  // 7. 年度数据
  const annualData = {
    totalIncome: annualIncome,
    totalExpenses: annualExpenses,
    debtPayments: annualDebtPayments,
    netSavings: annualNetSavings
  };
  
  // 8. 财务健康评分计算
  let healthScore = 0;
  
  // 储蓄率评分 (25分)
  if (savingsRate >= 20) healthScore += 25;
  else if (savingsRate >= 15) healthScore += 20;
  else if (savingsRate >= 10) healthScore += 15;
  else if (savingsRate >= 5) healthScore += 10;
  
  // 应急基金评分 (20分)
  // 修正：应急基金月份应该基于月度生活费用，不包含债务还款
  const emergencyMonths = monthlyLivingExpenses > 0 ? (data.emergencyFund / monthlyLivingExpenses) : 0;
  if (emergencyMonths >= 6) healthScore += 20;
  else if (emergencyMonths >= 3) healthScore += 15;
  else if (emergencyMonths >= 1) healthScore += 8;
  
  // 负债比例评分 (20分)
  if (debtToIncomeRatio <= 20) healthScore += 20;
  else if (debtToIncomeRatio <= 30) healthScore += 15;
  else if (debtToIncomeRatio <= 40) healthScore += 10;
  else if (debtToIncomeRatio <= 50) healthScore += 5;
  
  // 流动性评分 (15分)
  if (currentRatio >= 2) healthScore += 15;
  else if (currentRatio >= 1.5) healthScore += 12;
  else if (currentRatio >= 1) healthScore += 8;
  
  // 资产收益率评分 (10分)
  if (assetReturnRate >= 5) healthScore += 10;
  else if (assetReturnRate >= 3) healthScore += 8;
  else if (assetReturnRate >= 1) healthScore += 5;
  
  // 资产负债率评分 (10分)
  if (debtToAssetRatio <= 30) healthScore += 10;
  else if (debtToAssetRatio <= 50) healthScore += 8;
  else if (debtToAssetRatio <= 70) healthScore += 5;
  
  // 健康等级
  let healthLevel: 'excellent' | 'good' | 'fair' | 'poor';
  if (healthScore >= 80) healthLevel = 'excellent';
  else if (healthScore >= 60) healthLevel = 'good';
  else if (healthScore >= 40) healthLevel = 'fair';
  else healthLevel = 'poor';
  
  // 9. 生成建议
  const metrics = {
    savingsRate,
    debtToIncomeRatio,
    emergencyFundCoverage,
    currentRatio,
    debtToAssetRatio,
    assetReturnRate,
    netWorth,
    totalAssets,
    totalDebt
  };
  
  // 使用多语言建议生成器或默认中文建议
  let recommendations: string[], strengths: string[], improvements: string[], riskFactors: string[];
  
  if (t) {
    recommendations = generateMultilingualRecommendations(data, metrics, t);
    strengths = generateMultilingualStrengths(data, metrics, t);
    improvements = generateMultilingualImprovements(data, metrics, t);
    riskFactors = generateMultilingualRiskFactors(data, metrics, t);
  } else {
    // 默认中文建议
    recommendations = generateRecommendations(data, metrics);
    strengths = generateStrengths(data, metrics);
    improvements = generateImprovements(data, metrics);
    riskFactors = generateRiskFactors(data, metrics);
  }
  
  return {
    netWorth,
    totalAssets,
    totalDebt,
    savingsRate,
    debtToIncomeRatio,
    emergencyFundCoverage,
    assetStructure,
    debtStructure,
    financialRatios,
    annualData,
    healthScore,
    healthLevel,
    recommendations,
    strengths,
    improvements,
    riskFactors
  };
}

// 内部指标接口
interface InternalMetrics {
  savingsRate: number;
  debtToIncomeRatio: number;
  emergencyFundCoverage: number;
  currentRatio: number;
  debtToAssetRatio: number;
  assetReturnRate: number;
  netWorth: number;
  totalAssets: number;
  totalDebt: number;
}

/**
 * 生成理财建议
 */
function generateRecommendations(data: FinancialData, metrics: InternalMetrics): string[] {
  const recommendations: string[] = [];

  // 应急基金建议
  // 修正：使用月度生活费用计算应急基金月份
  const monthlyLivingExpenses = data.annualLivingExpenses / 12;
  const emergencyMonths = monthlyLivingExpenses > 0 ? 
    (data.emergencyFund / monthlyLivingExpenses) : 0;
  if (emergencyMonths < 3) {
    recommendations.push('建议优先建立应急基金，目标是3-6个月的生活费用，以应对突发情况。');
  }

  // 储蓄率建议
  if (metrics.savingsRate < 10) {
    recommendations.push('尝试提高储蓄率到收入的10-20%，可以从减少非必要支出开始。');
  }

  // 负债比例建议
  if (metrics.debtToIncomeRatio > 36) {
    recommendations.push('负债比例较高，建议制定还债计划，优先偿还高利率债务。');
  }

  // 流动性建议
  if (metrics.currentRatio < 1.5 && (data.creditCardDebt + data.consumerLoans) > 0) {
    recommendations.push('流动比率较低，建议增加流动资产或减少短期债务，提高短期偿债能力。');
  }
  
  return recommendations;
}

/**
 * 生成财务优势
 */
function generateStrengths(data: FinancialData, metrics: InternalMetrics): string[] {
  const strengths: string[] = [];
  if (metrics.savingsRate >= 15) strengths.push('储蓄率表现优秀');
  if (metrics.debtToIncomeRatio <= 20) strengths.push('负债水平健康');
  if (metrics.netWorth > 0) strengths.push('净资产为正');
  if (metrics.currentRatio >= 2) strengths.push('流动性表现出色');
  return strengths;
}

/**
 * 生成改进建议
 */
function generateImprovements(data: FinancialData, metrics: InternalMetrics): string[] {
  const improvements: string[] = [];
  if (metrics.savingsRate < 10) improvements.push('提高储蓄率');
  if (metrics.debtToIncomeRatio > 36) improvements.push('降低负债比例');
  if (metrics.currentRatio < 1.5) improvements.push('提高流动性');
  if (data.creditCardDebt > 0) improvements.push('偿还信用卡债务');
  return improvements;
}

/**
 * 生成风险因素
 */
function generateRiskFactors(data: FinancialData, metrics: InternalMetrics): string[] {
  const riskFactors: string[] = [];
  const emergencyMonths = data.annualLivingExpenses > 0 ? (data.emergencyFund / (data.annualLivingExpenses / 12)) : 0;
  if (emergencyMonths < 1) riskFactors.push('没有应急基金');
  if (metrics.debtToIncomeRatio > 50) riskFactors.push('负债比例过高');
  if (data.creditCardDebt > (data.annualSalary + data.annualOtherIncome) / 4) riskFactors.push('信用卡债务过高');
  return riskFactors;
}

/**
 * 获取财务指标详情
 */
export function getFinancialMetrics(data: FinancialData, analysis: FinancialAnalysis, t?: Locale): FinancialMetric[] {
  // 默认中文指标名称
  const defaultNames = {
    netWorth: '净资产',
    savingsRate: '储蓄率',
    debtToIncomeRatio: '负债收入比',
    emergencyFundCoverage: '应急储备覆盖率'
  };
  
  const defaultDescriptions = {
    netWorth: '总资产减去总负债',
    savingsRate: '年度净储蓄占收入的比例',
    debtToIncomeRatio: '年度偿债支出占收入的比例',
    emergencyFundCoverage: '应急基金可覆盖的生活月数'
  };
  
  const defaultExplanations = {
    netWorth: '净资产是衡量个人财富的重要指标。',
    savingsRate: '理想的储蓄率应该在15-20%以上。',
    debtToIncomeRatio: '负债收入比不应超过36%。',
    emergencyFundCoverage: '应急基金应能覆盖3-6个月的基本生活费用。'
  };
  
  // 使用多语言或默认中文
  const names = t ? {
    netWorth: t.results.metrics.netWorth,
    savingsRate: t.results.metrics.savingsRate,
    debtToIncomeRatio: t.results.metrics.debtToIncomeRatio,
    emergencyFundCoverage: t.results.metrics.emergencyFundCoverage
  } : defaultNames;
  
  const descriptions = t ? {
    netWorth: t.nav.languageToggle === 'Language' ? defaultDescriptions.netWorth : 'Total assets minus total liabilities',
    savingsRate: t.nav.languageToggle === 'Language' ? defaultDescriptions.savingsRate : 'Annual net savings as percentage of income',
    debtToIncomeRatio: t.nav.languageToggle === 'Language' ? defaultDescriptions.debtToIncomeRatio : 'Annual debt payments as percentage of income',
    emergencyFundCoverage: t.nav.languageToggle === 'Language' ? defaultDescriptions.emergencyFundCoverage : 'Months of living expenses covered by emergency fund'
  } : defaultDescriptions;
  
  const explanations = t ? {
    netWorth: t.nav.languageToggle === 'Language' ? defaultExplanations.netWorth : 'Net worth is an important indicator of personal wealth.',
    savingsRate: t.nav.languageToggle === 'Language' ? defaultExplanations.savingsRate : 'Ideal savings rate should be 15-20% or above.',
    debtToIncomeRatio: t.nav.languageToggle === 'Language' ? defaultExplanations.debtToIncomeRatio : 'Debt-to-income ratio should not exceed 36%.',
    emergencyFundCoverage: t.nav.languageToggle === 'Language' ? defaultExplanations.emergencyFundCoverage : 'Emergency fund should cover 3-6 months of basic living expenses.'
  } : defaultExplanations;
  
  return [
    {
      name: names.netWorth,
      actualValue: analysis.netWorth,
      targetValue: '> 0',
      description: descriptions.netWorth,
      status: analysis.netWorth > 0 ? 'good' : 'warning',
      explanation: explanations.netWorth
    },
    {
      name: names.savingsRate,
      actualValue: analysis.savingsRate,
      targetValue: '15-20%',
      description: descriptions.savingsRate,
      status: analysis.savingsRate >= 15 ? 'good' : analysis.savingsRate >= 5 ? 'warning' : 'danger',
      explanation: explanations.savingsRate
    },
    {
      name: names.debtToIncomeRatio,
      actualValue: analysis.debtToIncomeRatio,
      targetValue: '< 36%',
      description: descriptions.debtToIncomeRatio,
      status: analysis.debtToIncomeRatio <= 20 ? 'good' : analysis.debtToIncomeRatio <= 36 ? 'warning' : 'danger',
      explanation: explanations.debtToIncomeRatio
    },
    {
      name: names.emergencyFundCoverage,
      actualValue: analysis.emergencyFundCoverage,
      targetValue: t?.nav.languageToggle === 'Language' ? '3-6月' : '3-6 months',
      description: descriptions.emergencyFundCoverage,
      status: analysis.emergencyFundCoverage >= 3 ? 'good' : analysis.emergencyFundCoverage >= 1 ? 'warning' : 'danger',
      explanation: explanations.emergencyFundCoverage
    }
  ];
}