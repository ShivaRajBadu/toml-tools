'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import * as TOML from '@iarna/toml'
import TomlTree from '@/components/TomlTree'
import { TomlDocs } from '@/components/TomlDocs'
import { Upload, Download } from 'lucide-react'
import { TomlTemplates } from '@/components/TomlTemplates'

const SAMPLE_TOML = `# Welcome to TOML Viewer!
# This is a sample TOML configuration file

title = "My Project"
version = "1.0.0"
description = """
A multi-line description
that spans across
multiple lines."""

[server]
host = "localhost"
port = 8080
enabled = true

[database]
url = "postgresql://localhost:5432"
max_connections = 100

[features]
logging = true
cache = false
rate_limit = 5000

[dependencies]
react = "18.0.0"
nextjs = "13.0.0"
`

export default function Home() {
  const [tomlContent, setTomlContent] = useState(SAMPLE_TOML)
  const [parsedData, setParsedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const parseToml = (content: string) => {
    try {
      const parsed = TOML.parse(content)
      setParsedData(parsed)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setParsedData(null)
    }
  }

  useEffect(() => {
    parseToml(SAMPLE_TOML)
  }, [])

  const handleEditorChange = (value: string) => {
    setTomlContent(value)
    parseToml(value)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTomlContent(content)
        parseToml(content)
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([tomlContent], { type: 'application/toml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleTemplateSelect = (template: string) => {
    setTomlContent(template)
  }

  return (
    <div className="min-h-screen flex flex-col ">

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>TOML Editor & Viewer</h1>
          <p className='text-sm text-gray-500'>
            Edit, validate, and visualize TOML files with our free online tool. Explore templates for server, database, app, and deployment configurations.
          </p>
        </div>
        {/* Actions Bar */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => document.getElementById('fileInput')?.click()}
              className="flex items-center gap-2"
            >
              <Upload size={18} />
              Upload TOML
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </Button>
          </div>
          {error && (
            <div className="text-sm text-red-400 bg-red-950/50 px-3 py-1 rounded-md">
              {error}
            </div>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          accept=".toml"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Editor and Tree Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 h-[calc(100vh-180px)]">
          {/* Editor Panel */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col overflow-hidden">
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
              <h2 className="text-base font-medium text-gray-300">TOML Editor</h2>
              <p className="text-sm text-gray-500">Edit your TOML files with syntax highlighting and validation.</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0">
                <CodeMirror
                  value={tomlContent}
                  height="100%"
                  theme="dark"
                  extensions={[javascript()]}
                  onChange={handleEditorChange}
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
              </div>
            </div>
          </div>

          {/* Tree View Panel */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col overflow-hidden">
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
              <h2 className="text-base font-medium text-gray-300">TOML Structure</h2>
              <p className="text-sm text-gray-500">Visualize the structure of your TOML data.</p>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="p-4">
                {parsedData ? (
                  <TomlTree data={parsedData} />
                ) : (
                  <div className="text-red-400 text-base">Invalid TOML</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-300">TOML Templates</h2>
          <p className="text-sm text-gray-500 mb-2">Choose from a variety of templates for server, database, app, and deployment configurations.</p>
          <TomlTemplates onSelect={handleTemplateSelect} />
        </div>

        {/* Documentation */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-300">Understanding TOML</h2>
          <p className="text-sm text-gray-500 mb-2">Learn about TOML syntax, data types, and more.</p>
          <TomlDocs />
        </div>
      </div>
    </div>
  )
}
