import React from 'react'
import { FileCode } from 'lucide-react'
import * as TOML from '@iarna/toml'
import { Button } from '@/components/ui/button'

interface ConverterProps {
    tomlContent: string
}

export function FormatConverter({ tomlContent }: ConverterProps) {
    const [format, setFormat] = React.useState<'json' | 'yaml'>('json')
    const [converted, setConverted] = React.useState('')

    const convert = React.useCallback(() => {
        try {
            const parsed = TOML.parse(tomlContent)
            if (format === 'json') {
                setConverted(JSON.stringify(parsed, null, 2))
            }
            // Add YAML conversion when needed
        } catch (err) {
            setConverted('Error converting format')
        }
    }, [tomlContent, format])

    React.useEffect(() => {
        convert()
    }, [tomlContent, format, convert])

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileCode className="text-purple-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">
                        {format.toUpperCase()} Preview
                    </h3>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormat('json')}
                        className={format === 'json' ? 'bg-gray-800' : ''}
                    >
                        JSON
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormat('yaml')}
                        className={format === 'yaml' ? 'bg-gray-800' : ''}
                    >
                        YAML
                    </Button>
                </div>
            </div>
            <pre className="bg-gray-800/50 p-4 rounded-lg overflow-auto text-sm">
                <code className="text-gray-300">{converted}</code>
            </pre>
        </div>
    )
} 