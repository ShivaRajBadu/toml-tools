import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import * as TOML from '@iarna/toml'

interface ValidationError {
    line: number
    column: number
    message: string
}

interface TomlValidatorProps {
    content: string
}

export function TomlValidator({ content }: TomlValidatorProps) {
    const [errors, setErrors] = React.useState<ValidationError[]>([])
    const [isValid, setIsValid] = React.useState(false)

    React.useEffect(() => {
        try {
            TOML.parse(content)
            setIsValid(true)
            setErrors([])
        } catch (err: any) {
            setIsValid(false)
            const match = err.message.match(/at row (\d+), col (\d+)/)
            if (match) {
                setErrors([{
                    line: parseInt(match[1]),
                    column: parseInt(match[2]),
                    message: err.message
                }])
            }
        }
    }, [content])

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-4">
                {isValid ? (
                    <CheckCircle className="text-green-400" size={20} />
                ) : (
                    <AlertCircle className="text-red-400" size={20} />
                )}
                <h3 className="text-lg font-semibold text-white">
                    Validation {isValid ? 'Success' : 'Error'}
                </h3>
            </div>

            {isValid ? (
                <div className="text-green-400 bg-green-950/30 px-4 py-2 rounded-lg">
                    TOML syntax is valid
                </div>
            ) : (
                <div className="space-y-2">
                    {errors.map((error, index) => (
                        <div
                            key={index}
                            className="bg-red-950/30 text-red-300 px-4 py-2 rounded-lg"
                        >
                            <div className="font-mono text-sm">
                                Line {error.line}, Column {error.column}
                            </div>
                            <div className="text-sm mt-1">
                                {error.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 