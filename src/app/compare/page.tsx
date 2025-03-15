'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import * as TOML from '@iarna/toml'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'
import type { Metadata } from 'next'

interface Difference {
    key: string
    left: any
    right: any
    type: 'added' | 'removed' | 'modified'
}

// export const metadata: Metadata = {
//     title: 'TOML Diff - Compare TOML Files Online',
//     description: 'Compare two TOML files and see the differences side by side. Highlight changes, additions, and deletions in TOML configurations.',
//     keywords: 'TOML diff, TOML compare, configuration comparison, TOML tools, diff viewer',
// }

export default function Compare() {
    const [leftContent, setLeftContent] = useState('')
    const [rightContent, setRightContent] = useState('')
    const [differences, setDifferences] = useState<Difference[]>([])
    const [error, setError] = useState<string | null>(null)

    const findDifferences = (left: any, right: any, path = ''): Difference[] => {
        const diffs: Difference[] = []

        // Check for removed keys
        Object.keys(left).forEach(key => {
            const currentPath = path ? `${path}.${key}` : key
            if (!(key in right)) {
                diffs.push({
                    key: currentPath,
                    left: left[key],
                    right: undefined,
                    type: 'removed'
                })
            } else if (typeof left[key] === 'object' && typeof right[key] === 'object') {
                diffs.push(...findDifferences(left[key], right[key], currentPath))
            } else if (JSON.stringify(left[key]) !== JSON.stringify(right[key])) {
                diffs.push({
                    key: currentPath,
                    left: left[key],
                    right: right[key],
                    type: 'modified'
                })
            }
        })

        // Check for added keys
        Object.keys(right).forEach(key => {
            const currentPath = path ? `${path}.${key}` : key
            if (!(key in left)) {
                diffs.push({
                    key: currentPath,
                    left: undefined,
                    right: right[key],
                    type: 'added'
                })
            }
        })

        return diffs
    }

    const compareToml = () => {
        try {
            const leftParsed = TOML.parse(leftContent)
            const rightParsed = TOML.parse(rightContent)
            const diffs = findDifferences(leftParsed, rightParsed)
            setDifferences(diffs)
            setError(null)
        } catch (err: any) {
            setError(err.message)
            setDifferences([])
        }
    }

    const handleFileUpload = (side: 'left' | 'right') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const content = e.target?.result as string
                if (side === 'left') {
                    setLeftContent(content)
                } else {
                    setRightContent(content)
                }
            }
            reader.readAsText(file)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <h1 className="text-2xl font-bold text-white text-center py-4">TOML Compare</h1>

            <div className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                    {/* Left Editor */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden flex flex-col min-h-0">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center shrink-0">
                            <h2 className="text-sm font-medium text-gray-300">Original TOML</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('leftFile')?.click()}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Upload size={16} />
                                Upload
                            </Button>
                        </div>
                        <input
                            id="leftFile"
                            type="file"
                            accept=".toml"
                            className="hidden"
                            onChange={handleFileUpload('left')}
                        />
                        <div className="flex-1">
                            <CodeMirror
                                value={leftContent}
                                height="100%"
                                theme="dark"
                                extensions={[javascript()]}
                                onChange={setLeftContent}
                                className="text-sm h-full"
                            />
                        </div>
                    </div>

                    {/* Right Editor */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden flex flex-col min-h-0">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center shrink-0">
                            <h2 className="text-sm font-medium text-gray-300">Modified TOML</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('rightFile')?.click()}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Upload size={16} />
                                Upload
                            </Button>
                        </div>
                        <input
                            id="rightFile"
                            type="file"
                            accept=".toml"
                            className="hidden"
                            onChange={handleFileUpload('right')}
                        />
                        <div className="flex-1">
                            <CodeMirror
                                value={rightContent}
                                height="100%"
                                theme="dark"
                                extensions={[javascript()]}
                                onChange={setRightContent}
                                className="text-sm h-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Differences Panel */}
                {(differences.length > 0 || error) && (
                    <div className="mt-6 bg-gray-900 rounded-lg shadow-sm border border-gray-800">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
                            <h2 className="text-sm font-medium text-gray-300">Differences</h2>
                        </div>
                        <div className="p-4">
                            {error ? (
                                <div className="text-red-400">{error}</div>
                            ) : (
                                <div className="space-y-2">
                                    {differences.map((diff, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 rounded ${diff.type === 'added' ? 'bg-green-950/50' :
                                                diff.type === 'removed' ? 'bg-red-950/50' :
                                                    'bg-yellow-950/50'
                                                }`}
                                        >
                                            <div className="font-medium text-sm text-gray-300">
                                                {diff.key}
                                                <span className="ml-2 text-xs text-gray-400">
                                                    ({diff.type})
                                                </span>
                                            </div>
                                            <div className="mt-1 text-sm">
                                                {diff.type === 'modified' ? (
                                                    <>
                                                        <div className="text-red-400">- {JSON.stringify(diff.left)}</div>
                                                        <div className="text-green-400">+ {JSON.stringify(diff.right)}</div>
                                                    </>
                                                ) : diff.type === 'added' ? (
                                                    <div className="text-green-400">+ {JSON.stringify(diff.right)}</div>
                                                ) : (
                                                    <div className="text-red-400">- {JSON.stringify(diff.left)}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 