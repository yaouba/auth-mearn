import { Check, X } from "lucide-react";

const PasswordCriteria = ({password}) => {

    const criteria = [
        {label: 'At least 6 characters', met: password.length >= 6},
        {label: 'Contains at least one uppercase letter', met: /[A-Z]/.test(password)},
        {label: 'Contains at least one lowercase letter', met: /[a-z]/.test(password)},
        {label: 'Contains at least one number', met: /[0-9]/.test(password)},
        {label: 'Contains at least one special character', met: /[!@#$%^&*()_+]/.test(password)}
    ];

    return (
        <div className="mt-4">
            {criteria.map(({label, met}) => (
                <div key={label} className={`${met ? 'text-green-500' : 'text-gray-600'} text-sm flex items-center`}>
                    {met ? (
                        <Check className="size-4 text-green-500 mr-2" />
                    ) : (
                        <X className="size-4 text-gray-600 mr-2" />
                    )}
                    <span>{label}</span>
                </div>
            ))}
        </div>
    )
}

const PasswordStrengthMeter = ({password}) => {

    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[A-Z]/)) strength++;
        if (pass.match(/[a-z]/)) strength++;
        if (pass.match(/[0-9]/)) strength++;
        if (pass.match(/[!@#$%^&*()_+]/)) strength++;
        return strength;
    }

    const getStrengthColor = (strength) => {
        if (strength === 0) return 'bg-red-500';
        if (strength === 1) return 'bg-red-500';
        if (strength === 2) return 'bg-yellow-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    }

    const getStrengthText = (strength) => {
        if (strength === 0) return 'Weak';
        if (strength === 1) return 'Fair';
        if (strength === 2) return 'Good';
        if (strength === 3) return 'Strong';
        return 'Very Strong';
    }

    const strength = getStrength(password);

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Password Strength</span>
                <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
            </div>
            <div className="flex space-x-1">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`w-1/4 h-1 rounded-full transition-colors duration-200 ${i < strength ? getStrengthColor(strength) : 'bg-gray-600'}`} />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    )
}

export default PasswordStrengthMeter