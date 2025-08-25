"use client";

import { useState } from 'react';
import { FinancialData } from '@/types/financial';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinancialFormProps {
  onSubmit: (data: FinancialData) => void;
}

export default function FinancialForm({ onSubmit }: FinancialFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FinancialData>({
    // 资产类
    ownerHouseValue: 0,
    investmentProperty: 0,
    carValue: 0,
    stocksValue: 0,
    fundsValue: 0,
    cashAndDeposits: 0,
    pensionAccount: 0,
    
    // 负债类
    mortgageBalance: 0,
    carLoanBalance: 0,
    creditCardDebt: 0,
    consumerLoans: 0,
    
    // 收入/支出类
    annualSalary: 0,
    annualOtherIncome: 0,
    annualLivingExpenses: 0,
    annualMortgagePayment: 0,
    annualCarPayment: 0,
    annualInvestmentIncome: 0,
    emergencyFund: 0
  });

  const handleInputChange = (field: keyof FinancialData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };



  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 资产类 */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            {t.form.assets.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.ownerHouseValue} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.ownerHouseValue}
                onChange={(e) => handleInputChange('ownerHouseValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.house}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.investmentProperty} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.investmentProperty}
                onChange={(e) => handleInputChange('investmentProperty', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.investment}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.carValue} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.carValue}
                onChange={(e) => handleInputChange('carValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.car}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.stocksValue} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.stocksValue}
                onChange={(e) => handleInputChange('stocksValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.stocks}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.fundsValue} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.fundsValue}
                onChange={(e) => handleInputChange('fundsValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.funds}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.cashAndDeposits} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.cashAndDeposits}
                onChange={(e) => handleInputChange('cashAndDeposits', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.cash}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.pensionAccount} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.pensionAccount}
                onChange={(e) => handleInputChange('pensionAccount', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.pension}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.assets.emergencyFund} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.emergencyFund}
                onChange={(e) => handleInputChange('emergencyFund', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.emergency}
              />
            </div>
          </div>
        </div>

        {/* 负债类 */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            {t.form.debts.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.debts.mortgageBalance} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.mortgageBalance}
                onChange={(e) => handleInputChange('mortgageBalance', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.mortgage}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.debts.carLoanBalance} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.carLoanBalance}
                onChange={(e) => handleInputChange('carLoanBalance', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.carLoan}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.debts.creditCardDebt} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.creditCardDebt}
                onChange={(e) => handleInputChange('creditCardDebt', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.creditCard}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.debts.consumerLoans} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.consumerLoans}
                onChange={(e) => handleInputChange('consumerLoans', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.consumer}
              />
            </div>
          </div>
        </div>

        {/* 收入/支出类 */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            {t.form.incomeExpense.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualSalary} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.annualSalary}
                onChange={(e) => handleInputChange('annualSalary', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.salary}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualOtherIncome} ({t.form.unit})
                <span className="text-xs text-gray-500 ml-1">{t.form.incomeExpense.annualOtherIncomeDesc}</span>
              </label>
              <input
                type="number"
                value={formData.annualOtherIncome}
                onChange={(e) => handleInputChange('annualOtherIncome', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.otherIncome}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualLivingExpenses} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.annualLivingExpenses}
                onChange={(e) => handleInputChange('annualLivingExpenses', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.living}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualMortgagePayment} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.annualMortgagePayment}
                onChange={(e) => handleInputChange('annualMortgagePayment', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.mortgagePayment}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualCarPayment} ({t.form.unit})
              </label>
              <input
                type="number"
                value={formData.annualCarPayment}
                onChange={(e) => handleInputChange('annualCarPayment', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.carPayment}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.form.incomeExpense.annualInvestmentIncome} ({t.form.unit})
                <span className="text-xs text-gray-500 ml-1">{t.form.incomeExpense.annualInvestmentIncomeDesc}</span>
              </label>
              <input
                type="number"
                value={formData.annualInvestmentIncome}
                onChange={(e) => handleInputChange('annualInvestmentIncome', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.form.placeholders.investmentIncome}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            {t.form.submitButton}
          </button>
        </div>
      </form>
    </div>
  );
}