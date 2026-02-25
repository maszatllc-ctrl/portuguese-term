import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
    { name: 'USA', code: '+1', flag: '🇺🇸' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
];

const CountrySelector = ({ onSelectCountry }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        onSelectCountry(selectedCountry.code);
    }, [selectedCountry, onSelectCountry]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="flex items-center space-x-2 pl-3 py-3 h-full rounded-l-lg border-r border-gray-300 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedCountry.flag}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                        <li
                            key={country.name}
                            className="flex items-center px-4 py-2 space-x-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(country)}
                        >
                            <span>{country.flag}</span>
                            <span className="text-gray-700">{country.name} ({country.code})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountrySelector;