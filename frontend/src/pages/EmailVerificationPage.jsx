import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { useNavigate } from "react-router-dom"


const EmailVerificationPage = () => {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const handleChange = (index, value) => {
        const newCode = [...code]

        //handle pasted code
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split('');
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }

    }
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const verificationCode = code.join('')

        console.log(verificationCode)
    }

    useEffect(() => {
        if (code.every((digit) => digit !== '')) {
            handleSubmit(new Event("submit"));
        }
    }, [code])

  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-tr from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Verify your email
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Enter the code sent to your email address.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => inputRefs.current[i] = el}
                            type="text"
                            maxLength='6'
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        />
                    ))}
                        
                    </div>
                    
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? <Loader className="size-5 text-white animate-spin mx-auto" /> : 'Verify'}    
                    </motion.button>
                </form>
            </div>
        </motion.div>
  )
}

export default EmailVerificationPage