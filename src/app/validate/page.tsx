'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, AlertCircle, CheckCircle, Copy, FileJson } from 'lucide-react'
import Link from 'next/link'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import * as TOML from '@iarna/toml'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

interface ValidationError {
    line: number
    column: number
    message: string
    type: 'error' | 'warning'
}

// export const metadata: Metadata = {
//     title: 'TOML Validator - Check and Validate TOML Files Online',
//     description: 'Online TOML validator with real-time syntax checking, error reporting, and JSON preview. Validate your TOML configuration files instantly.',
//     keywords: 'TOML validator, TOML syntax checker, TOML parser, configuration validation, TOML tools',
// }

export default function Validate() {
    const [tomlContent, setTomlContent] = useState('')
    const [parsedJson, setParsedJson] = useState<string>('')
    const [errors, setErrors] = useState<ValidationError[]>([])
    const [copied, setCopied] = useState(false)

    const validateTOML = (content: string) => {
        try {
            const parsed = TOML.parse(content)
            setParsedJson(JSON.stringify(parsed, null, 2))
            setErrors([])

            // Add warnings for common issues
            const warnings: ValidationError[] = []

            // Check for empty tables
            if (content.includes('[]')) {
                warnings.push({
                    line: content.split('\n').findIndex(line => line.includes('[]')) + 1,
                    column: 1,
                    message: 'Empty table declaration found',
                    type: 'warning'
                })
            }

            // Check for potentially invalid date formats
            const dateRegex = /\d{4}-\d{2}-\d{2}/
            content.split('\n').forEach((line, index) => {
                if (dateRegex.test(line) && !line.includes('T')) {
                    warnings.push({
                        line: index + 1,
                        column: line.search(dateRegex) + 1,
                        message: 'Date might need timezone information',
                        type: 'warning'
                    })
                }
            })

            setErrors(warnings)
        } catch (err: any) {
            const match = err.message.match(/at row (\d+), col (\d+)/)
            if (match) {
                setErrors([{
                    line: parseInt(match[1]),
                    column: parseInt(match[2]),
                    message: err.message,
                    type: 'error'
                }])
            }
            setParsedJson('')
        }
    }

    const handleCopyJson = () => {
        navigator.clipboard.writeText(parsedJson)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result as string
                setTomlContent(content)
                validateTOML(content)
            }
            reader.readAsText(file)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <h1 className="text-2xl font-bold text-white text-center py-4">TOML Validator</h1>
            <div className="flex-1 container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
                    {/* Editor Panel */}
                    <div className="flex flex-col">
                        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col flex-1">
                            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
                                <h2 className="text-sm font-medium text-gray-300">TOML Input</h2>
                                {errors.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={16} className={errors.some(e => e.type === 'error') ? 'text-red-400' : 'text-yellow-400'} />
                                        <span className={errors.some(e => e.type === 'error') ? 'text-red-400' : 'text-yellow-400'}>
                                            {errors.some(e => e.type === 'error') ? 'Invalid TOML' : 'Warnings Found'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0">
                                    <CodeMirror
                                        value={tomlContent}
                                        height="100%"
                                        theme="dark"
                                        extensions={[javascript()]}
                                        onChange={(value) => {
                                            setTomlContent(value)
                                            validateTOML(value)
                                        }}
                                        className="text-[15px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Validation Messages */}
                        {errors.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {errors.map((error, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg flex items-start gap-2 ${error.type === 'error' ? 'bg-red-950/50 text-red-400' : 'bg-yellow-950/50 text-yellow-400'
                                            }`}
                                    >
                                        <AlertCircle size={16} className="mt-1 shrink-0" />
                                        <div>
                                            <div className="font-mono text-sm">
                                                Line {error.line}, Column {error.column}
                                            </div>
                                            <div className="text-[15px] mt-1">
                                                {error.message}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* JSON Preview Panel */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FileJson size={16} className="text-blue-400" />
                                <h2 className="text-sm font-medium text-gray-300">JSON Preview</h2>
                            </div>
                            {parsedJson && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopyJson}
                                    className="flex items-center gap-2"
                                >
                                    <Copy size={14} />
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            )}
                        </div>
                        <div className="flex-1 p-4 overflow-auto">
                            <pre className="text-sm text-gray-300 font-mono">
                                {parsedJson || 'No valid TOML to preview'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 