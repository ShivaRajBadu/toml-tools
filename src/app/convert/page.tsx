'use client'

import { useState } from 'react'
import { ArrowLeft, FileCode, ArrowRight, Copy, Upload, Download, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import * as TOML from '@iarna/toml'
import { dump as yamlDump } from 'js-yaml'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

type Format = 'json' | 'yaml' | 'xml' | 'ini' | 'properties' | 'toml' | 'txt'

interface ConversionError {
    message: string
}

// export const metadata: Metadata = {
//     title: 'TOML Converter - Convert TOML to JSON, YAML, XML & More',
//     description: 'Convert TOML to multiple formats including JSON, YAML, XML, INI, and Properties. Free online TOML converter with instant preview and download options.',
//     keywords: 'TOML converter, TOML to JSON, TOML to YAML, TOML to XML, format converter, TOML tools',
// }

export default function Convert() {
    const [inputContent, setInputContent] = useState('')
    const [convertedContent, setConvertedContent] = useState('')
    const [selectedFormat, setSelectedFormat] = useState<Format>('json')
    const [error, setError] = useState<ConversionError | null>(null)
    const [copied, setCopied] = useState(false)

    const convertToFormat = (content: string, format: Format) => {
        try {
            let parsed: any
            let result = ''

            if (selectedFormat === 'toml') {
                parsed = JSON.parse(content)
                result = TOML.stringify(parsed)
            } else {
                parsed = TOML.parse(content)
                switch (format) {
                    case 'json':
                        result = JSON.stringify(parsed, null, 2)
                        break
                    case 'yaml':
                        result = yamlDump(parsed, {
                            indent: 2,
                            lineWidth: -1,
                            noRefs: true
                        })
                        break
                    case 'xml':
                        result = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            objectToXml(parsed, 'root')
                        break
                    case 'ini':
                        result = objectToIni(parsed)
                        break
                    case 'properties':
                        result = objectToProperties(parsed)
                        break
                }
            }

            setConvertedContent(result)
            setError(null)
        } catch (err: any) {
            setError({ message: err.message })
            setConvertedContent('')
        }
    }

    const objectToXml = (obj: any, rootName: string, level = 0): string => {
        const indent = '  '.repeat(level)
        let xml = `${indent}<${rootName}>\n`

        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    if (typeof item === 'object') {
                        xml += objectToXml(item, key, level + 1)
                    } else {
                        xml += `${indent}  <${key}>${item}</${key}>\n`
                    }
                })
            } else if (typeof value === 'object' && value !== null) {
                xml += objectToXml(value, key, level + 1)
            } else {
                xml += `${indent}  <${key}>${value}</${key}>\n`
            }
        }

        xml += `${indent}</${rootName}>\n`
        return xml
    }

    const objectToIni = (obj: any, prefix = ''): string => {
        let ini = ''

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                ini += `\n[${prefix}${key}]\n`
                ini += objectToIni(value, `${prefix}${key}.`)
            } else {
                ini += `${key} = ${formatIniValue(value)}\n`
            }
        }

        return ini
    }

    const objectToProperties = (obj: any, prefix = ''): string => {
        let props = ''

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                props += objectToProperties(value, `${prefix}${key}.`)
            } else {
                props += `${prefix}${key}=${formatPropertyValue(value)}\n`
            }
        }

        return props
    }

    const formatIniValue = (value: any): string => {
        if (Array.isArray(value)) return JSON.stringify(value)
        if (typeof value === 'string') return `"${value}"`
        return String(value)
    }

    const formatPropertyValue = (value: any): string => {
        if (Array.isArray(value)) return value.join(',')
        return String(value)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(convertedContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = (content: string, format: Format) => {
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `converted.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result as string
                setInputContent(content)
                convertToFormat(content, selectedFormat)
            }
            reader.readAsText(file)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">


            <div className="flex-1 container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
                    {/* Input Panel */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
                            <h2 className="text-sm font-medium text-gray-300">TOML Input</h2>
                            <div className='flex gap-2 items-center'>
                                <div>
                                    <Button
                                        className='flex gap-2 items-center cursor-pointer'
                                        variant="outline"
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    >
                                        <Upload size={14} />
                                        Upload File
                                    </Button>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".toml,.json"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={!inputContent}
                                    onClick={() => handleDownload(inputContent, 'txt')}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Download size={14} />
                                    Download Input
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-0">
                                <CodeMirror
                                    value={inputContent}
                                    height="100%"
                                    theme="dark"
                                    extensions={[javascript()]}
                                    onChange={(value) => {
                                        setInputContent(value)
                                        convertToFormat(value, selectedFormat)
                                    }}
                                    className="h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Converted Output */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-sm font-medium text-gray-300">
                                        Convert to:
                                    </h2>
                                    <div className="flex gap-2">
                                        {(['json', 'yaml', 'xml', 'ini', 'properties'] as Format[]).map((format) => (
                                            <Button
                                                key={format}
                                                className='cursor-pointer'
                                                variant={selectedFormat === format ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedFormat(format)
                                                    convertToFormat(inputContent, format)
                                                }}
                                            >
                                                {format.toUpperCase()}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                {convertedContent && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <Copy size={14} />
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDownload(convertedContent, selectedFormat)}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <Download size={14} />
                                            Download Output
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            {error ? (
                                <div className="flex items-center gap-2 text-red-400">
                                    <AlertCircle size={16} />
                                    <span>{error.message}</span>
                                </div>
                            ) : (
                                <CodeMirror
                                    value={convertedContent}
                                    height="100%"
                                    theme="dark"
                                    extensions={[javascript()]}
                                    readOnly
                                    className="text-[15px]"
                                    basicSetup={{
                                        lineNumbers: true,
                                        highlightActiveLineGutter: true,
                                        highlightSpecialChars: true,
                                        foldGutter: true,
                                        dropCursor: true,
                                        allowMultipleSelections: true,
                                        indentOnInput: true,
                                        bracketMatching: true,
                                        closeBrackets: true,
                                        autocompletion: true,
                                        rectangularSelection: true,
                                        crosshairCursor: true,
                                        highlightActiveLine: true,
                                        highlightSelectionMatches: true,
                                        closeBracketsKeymap: true,
                                        defaultKeymap: true,
                                        searchKeymap: true,
                                        historyKeymap: true,
                                        foldKeymap: true,
                                        completionKeymap: true,
                                        lintKeymap: true,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 