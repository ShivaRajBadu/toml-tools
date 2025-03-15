import React from 'react'
import { FileJson } from 'lucide-react'

interface SchemaProps {
    data: any
}

export function TomlSchema({ data }: SchemaProps) {
    const generateSchema = (obj: any, level = 0): string => {
        if (Array.isArray(obj)) {
            const itemType = obj.length > 0 ? typeof obj[0] : 'any'
            return `Array<${itemType}>`
        }

        if (typeof obj === 'object' && obj !== null) {
            const entries = Object.entries(obj)
            const indent = '  '.repeat(level)
            const childIndent = '  '.repeat(level + 1)

            return `{\n${entries.map(([key, value]) => {
                const valueType = generateSchema(value, level + 1)
                return `${childIndent}${key}: ${valueType}`
            }).join(',\n')}\n${indent}}`
        }

        return typeof obj
    }

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-4">
                <FileJson className="text-yellow-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Schema</h3>
            </div>
            <pre className="bg-gray-800/50 p-4 rounded-lg overflow-auto text-sm">
                <code className="text-gray-300">
                    {generateSchema(data)}
                </code>
            </pre>
        </div>
    )
} 