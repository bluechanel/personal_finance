import { FinancialData } from '@/types/financial';
import { Locale } from '@/locales';

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
 * 生成多语言理财建议
 */
export function generateRecommendations(
  data: FinancialData, 
  metrics: InternalMetrics, 
  t: Locale
): string[] {
  const recommendations: string[] = [];
  const locale = t.nav.languageToggle === 'Language' ? 'zh' : 'en';

  // 应急基金建议
  const monthlyLivingExpenses = data.annualLivingExpenses / 12;
  const emergencyMonths = monthlyLivingExpenses > 0 ? 
    (data.emergencyFund / monthlyLivingExpenses) : 0;
  
  if (emergencyMonths < 3) {
    recommendations.push(
      locale === 'zh' 
        ? '建议优先建立应急基金，目标是3-6个月的生活费用，以应对突发情况。'
        : 'Prioritize building an emergency fund covering 3-6 months of living expenses for unexpected situations.'
    );
  }

  // 储蓄率建议
  if (metrics.savingsRate < 10) {
    recommendations.push(
      locale === 'zh'
        ? '尝试提高储蓄率到收入的10-20%，可以从减少非必要支出开始。'
        : 'Try to increase savings rate to 10-20% of income, starting by reducing non-essential expenses.'
    );
  }

  // 负债比例建议
  if (metrics.debtToIncomeRatio > 36) {
    recommendations.push(
      locale === 'zh'
        ? '负债比例较高，建议制定还债计划，优先偿还高利率债务。'
        : 'Debt ratio is high, recommend creating a debt repayment plan, prioritizing high-interest debt.'
    );
  }

  // 流动性建议
  if (metrics.currentRatio < 1.5 && (data.creditCardDebt + data.consumerLoans) > 0) {
    recommendations.push(
      locale === 'zh'
        ? '流动比率较低，建议增加流动资产或减少短期债务，提高短期偿债能力。'
        : 'Low liquidity ratio, recommend increasing liquid assets or reducing short-term debt to improve short-term solvency.'
    );
  }
  
  return recommendations;
}

/**
 * 生成多语言财务优势
 */
export function generateStrengths(
  data: FinancialData, 
  metrics: InternalMetrics, 
  t: Locale
): string[] {
  const strengths: string[] = [];
  const locale = t.nav.languageToggle === 'Language' ? 'zh' : 'en';

  if (metrics.savingsRate >= 15) {
    strengths.push(
      locale === 'zh' ? '储蓄率表现优秀' : 'Excellent savings rate'
    );
  }
  
  if (metrics.debtToIncomeRatio <= 20) {
    strengths.push(
      locale === 'zh' ? '负债水平健康' : 'Healthy debt level'
    );
  }
  
  if (metrics.netWorth > 0) {
    strengths.push(
      locale === 'zh' ? '净资产为正' : 'Positive net worth'
    );
  }
  
  if (metrics.currentRatio >= 2) {
    strengths.push(
      locale === 'zh' ? '流动性表现出色' : 'Excellent liquidity performance'
    );
  }
  
  return strengths;
}

/**
 * 生成多语言改进建议
 */
export function generateImprovements(
  data: FinancialData, 
  metrics: InternalMetrics, 
  t: Locale
): string[] {
  const improvements: string[] = [];
  const locale = t.nav.languageToggle === 'Language' ? 'zh' : 'en';

  if (metrics.savingsRate < 10) {
    improvements.push(
      locale === 'zh' ? '提高储蓄率' : 'Increase savings rate'
    );
  }
  
  if (metrics.debtToIncomeRatio > 36) {
    improvements.push(
      locale === 'zh' ? '降低负债比例' : 'Reduce debt ratio'
    );
  }
  
  if (metrics.currentRatio < 1.5) {
    improvements.push(
      locale === 'zh' ? '提高流动性' : 'Improve liquidity'
    );
  }
  
  if (data.creditCardDebt > 0) {
    improvements.push(
      locale === 'zh' ? '偿还信用卡债务' : 'Pay off credit card debt'
    );
  }
  
  return improvements;
}

/**
 * 生成多语言风险因素
 */
export function generateRiskFactors(
  data: FinancialData, 
  metrics: InternalMetrics, 
  t: Locale
): string[] {
  const riskFactors: string[] = [];
  const locale = t.nav.languageToggle === 'Language' ? 'zh' : 'en';

  const emergencyMonths = data.annualLivingExpenses > 0 ? 
    (data.emergencyFund / (data.annualLivingExpenses / 12)) : 0;
    
  if (emergencyMonths < 1) {
    riskFactors.push(
      locale === 'zh' ? '没有应急基金' : 'No emergency fund'
    );
  }
  
  if (metrics.debtToIncomeRatio > 50) {
    riskFactors.push(
      locale === 'zh' ? '负债比例过高' : 'Excessive debt ratio'
    );
  }
  
  if (data.creditCardDebt > (data.annualSalary + data.annualOtherIncome) / 4) {
    riskFactors.push(
      locale === 'zh' ? '信用卡债务过高' : 'Excessive credit card debt'
    );
  }
  
  return riskFactors;
}