"use client";

import { FinancialData, ChartData } from '@/types/financial';
import { calculateFinancialAnalysis, getFinancialMetrics } from '@/utils/financial';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface NewFinancialResultsProps {
  data: FinancialData;
}

export default function NewFinancialResults({ data }: NewFinancialResultsProps) {
  const { t } = useLanguage();
  const analysis = calculateFinancialAnalysis(data, t);
  const metrics = getFinancialMetrics(data, analysis, t);

  // 资产结构数据
  const assetStructureData: ChartData[] = [
    {
      name: t.results.assetTypes.liquidAssets,
      value: analysis.assetStructure.liquidAssets,
      percentage: analysis.assetStructure.liquidPercentage,
      color: '#3B82F6'
    },
    {
      name: t.results.assetTypes.investmentAssets,
      value: analysis.assetStructure.investmentAssets,
      percentage: analysis.assetStructure.investmentPercentage,
      color: '#10B981'
    },
    {
      name: t.results.assetTypes.personalAssets,
      value: analysis.assetStructure.personalAssets,
      percentage: analysis.assetStructure.personalPercentage,
      color: '#F59E0B'
    }
  ];

  // 收入支出数据
  const incomeExpenseData = [
    {
      name: t.results.incomeExpenseTypes.totalIncome,
      value: analysis.annualData.totalIncome,
      color: '#10B981'
    },
    {
      name: t.results.incomeExpenseTypes.totalExpenses,
      value: analysis.annualData.totalExpenses,
      color: '#EF4444'
    },
    {
      name: t.results.incomeExpenseTypes.netSavings,
      value: analysis.annualData.netSavings,
      color: '#3B82F6'
    }
  ];

  // 指标达标数据
  const targetData = metrics.map(metric => ({
    name: metric.name,
    status: metric.status === 'good' ? 100 : metric.status === 'warning' ? 60 : 20,
    color: metric.status === 'good' ? '#10B981' : metric.status === 'warning' ? '#F59E0B' : '#EF4444'
  }));

  const formatCurrency = (value: number) => {
    const unit = t.nav.languageToggle === 'Language' ? '万元' : '10k RMB';
    return `${value.toFixed(1)}${unit}`;
  };
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const getHealthColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthText = (level: string) => {
    switch (level) {
      case 'excellent': return t.results.healthLevels.excellent;
      case 'good': return t.results.healthLevels.good;
      case 'fair': return t.results.healthLevels.fair;
      case 'poor': return t.results.healthLevels.poor;
      default: return t.nav.languageToggle === 'Language' ? '未知' : 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* 财务健康总评 */}
      <div className={`p-6 rounded-xl border-2 ${getHealthColor(analysis.healthLevel)}`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{t.results.healthScore}</h3>
          <div className="text-4xl font-bold mb-2">{analysis.healthScore}/100</div>
          <div className="text-lg font-semibold">{getHealthText(analysis.healthLevel)}</div>
        </div>
      </div>

      {/* 关键指标表格 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t.results.keyMetrics.title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t.results.keyMetrics.headers.name}</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">{t.results.keyMetrics.headers.actual}</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">{t.results.keyMetrics.headers.target}</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">{t.results.keyMetrics.headers.status}</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t.results.keyMetrics.headers.description}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-3 font-medium">{metric.name}</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {typeof metric.actualValue === 'number' ? 
                      (metric.name.includes('覆盖率') ? 
                        `${metric.actualValue.toFixed(1)}月` :
                        metric.name.includes('率') || metric.name.includes('比') ? 
                          formatPercentage(metric.actualValue) : 
                          formatCurrency(metric.actualValue)
                      ) : 
                      metric.actualValue
                    }
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">{metric.targetValue}</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      metric.status === 'good' ? 'bg-green-100 text-green-800' :
                      metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {metric.status === 'good' ? t.results.keyMetrics.statuses.good : 
                       metric.status === 'warning' ? t.results.keyMetrics.statuses.warning : 
                       t.results.keyMetrics.statuses.danger}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">{metric.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 图表展示区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 资产结构饼图 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t.results.charts.assetStructure}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetStructureData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: { payload?: ChartData }) => {
                  const entry = (props.payload || props) as ChartData;
                  return `${entry.name}: ${entry.percentage?.toFixed(1)}%`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetStructureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 收入支出对比柱状图 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t.results.charts.incomeExpense}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="value">
                {incomeExpenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 指标达标情况 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t.results.charts.targetStatus}</h3>
        <div className="space-y-4">
          {targetData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-gray-700 truncate">
                {item.name}
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-semibold transition-all duration-500"
                    style={{ 
                      width: `${item.status}%`, 
                      backgroundColor: item.color 
                    }}
                  >
                    {item.status}%
                  </div>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status >= 80 ? 'bg-green-100 text-green-800' :
                  item.status >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status >= 80 ? t.results.targetLabels.excellent : 
                   item.status >= 60 ? t.results.targetLabels.good : 
                   t.results.targetLabels.poor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详细财务比率 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t.results.charts.financialRatios}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.financialRatios.currentRatio === 999 ? '∞' : analysis.financialRatios.currentRatio.toFixed(2)}
              </div>
              <div className="text-sm font-medium text-blue-800">{t.results.ratioTypes.currentRatio}</div>
              <div className="text-xs text-gray-600 mt-1">{t.results.ratioTypes.currentRatioDesc}</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(analysis.financialRatios.debtToAssetRatio)}
              </div>
              <div className="text-sm font-medium text-green-800">{t.results.ratioTypes.debtToAssetRatio}</div>
              <div className="text-xs text-gray-600 mt-1">{t.results.ratioTypes.debtToAssetRatioDesc}</div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatPercentage(analysis.financialRatios.assetReturnRate)}
              </div>
              <div className="text-sm font-medium text-purple-800">{t.results.ratioTypes.assetReturnRate}</div>
              <div className="text-xs text-gray-600 mt-1">{t.results.ratioTypes.assetReturnRateDesc}</div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {analysis.emergencyFundCoverage.toFixed(1)}{t.monthUnit}
              </div>
              <div className="text-sm font-medium text-orange-800">{t.results.ratioTypes.emergencyFundCoverage}</div>
              <div className="text-xs text-gray-600 mt-1">{t.results.ratioTypes.emergencyFundCoverageDesc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 建议和分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-4">{t.results.analysis.strengths}</h3>
          {analysis.strengths.length > 0 ? (
            <ul className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-sm text-green-700">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-600">{t.results.analysis.noContent.strengths}</p>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-4">{t.results.analysis.improvements}</h3>
          {analysis.improvements.length > 0 ? (
            <ul className="space-y-2">
              {analysis.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-sm text-blue-700">{improvement}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-blue-600">{t.results.analysis.noContent.improvements}</p>
          )}
        </div>
      </div>

      {/* 理财建议和风险提示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">{t.results.analysis.recommendations}</h3>
          {analysis.recommendations.length > 0 ? (
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span className="text-sm text-yellow-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-yellow-600">{t.results.analysis.noContent.recommendations}</p>
          )}
        </div>

        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h3 className="text-lg font-bold text-red-800 mb-4">{t.results.analysis.risks}</h3>
          {analysis.riskFactors.length > 0 ? (
            <ul className="space-y-2">
              {analysis.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span className="text-sm text-red-700">{risk}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-red-600">{t.results.analysis.noContent.risks}</p>
          )}
        </div>
      </div>
    </div>
  );
}