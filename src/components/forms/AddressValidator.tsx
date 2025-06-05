'use client';

import { useState } from 'react';

type ValidationResult = {
  isValid: boolean;
  message: string;
  suggestions?: string[];
};

export default function AddressValidator() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call to validation service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation logic - replace with actual API call
      const isValid = Math.random() > 0.3; // 70% chance of being valid for demo
      
      if (isValid) {
        setResult({
          isValid: true,
          message: '✓ Address is valid and ready for geocoding!',
        });
      } else {
        setResult({
          isValid: false,
          message: '⚠️ Address needs attention',
          suggestions: [
            'Verify street number and name',
            'Check for typos in the city name',
            'Ensure postal code matches the city/state',
          ],
        });
      }
    } catch (error) {
      setResult({
        isValid: false,
        message: 'Error validating address. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    // Clear previous results when editing
    if (result) setResult(null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={validateAddress} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street Address *
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="123 Main St"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Chicago"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="IL"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="60637"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={address.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="">Other...</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Validating...
              </>
            ) : (
              'Validate Address'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setAddress({
                street: '5801 S Ellis Ave',
                city: 'Chicago',
                state: 'IL',
                postalCode: '60637',
                country: 'US',
              });
              setResult(null);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Use Example
          </button>
        </div>
      </form>
      
      {result && (
        <div className={`p-4 rounded-md ${result.isValid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <div className="flex">
            <div className={`flex-shrink-0 ${result.isValid ? 'text-green-500' : 'text-amber-500'}`}>
              {result.isValid ? (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${result.isValid ? 'text-green-800' : 'text-amber-800'}`}>
                {result.message}
              </p>
              
              {!result.isValid && result.suggestions && (
                <div className="mt-2 text-sm text-amber-700">
                  <p className="font-medium">Suggestions:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {result.isValid && (
                <div className="mt-2">
                  <p className="text-sm text-green-700">
                    This address is properly formatted and ready for geocoding.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Note: This is a demo validation. For actual geocoding, use the full service with your CSV file.</p>
      </div>
    </div>
  );
}
