'use client'

import React, { useState, useEffect } from 'react';
import toml from '@iarna/toml';
import { Button } from '@/components/ui/button';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { Download, Copy, Upload } from 'lucide-react';

const Page = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [tomlOutput, setTomlOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [autoConvert, setAutoConvert] = useState(true);

    const handleConvert = () => {
        if (!jsonInput.trim()) {
            setError('');
            setTomlOutput('');
            return;
        }

        try {
            const jsonObject = JSON.parse(jsonInput);
            const tomlString = toml.stringify(jsonObject);
            setTomlOutput(tomlString);
            setError('');
        } catch (e: any) {
            const errorMessage = e.message || 'Invalid JSON input';
            setError(`Error: ${errorMessage}`);
            setTomlOutput('');
        }
    };

    const handleCopy = () => {
        if (tomlOutput) {
            navigator.clipboard.writeText(tomlOutput);
            setCopied(true);
        }
    };

    const handleDownload = () => {
        if (tomlOutput) {
            const blob = new Blob([tomlOutput], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.toml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setJsonInput(e.target?.result as string);
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (autoConvert) {
            handleConvert();
        }
    }, [jsonInput, autoConvert]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">JSON to TOML Converter</h1>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={autoConvert}
                                onChange={() => setAutoConvert(!autoConvert)}
                            />
                            Auto Convert
                        </label>
                        <Button onClick={handleConvert} disabled={autoConvert}>
                            Convert
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col overflow-hidden">
                        <div className="bg-gray-800 flex justify-between items-center border-b border-gray-700 px-4 py-3">
                            <h2 className="text-base font-medium text-gray-300">JSON Input</h2>
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
                                    accept=".json"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <CodeMirror
                                value={jsonInput}
                                height="100%"
                                minHeight='600px'
                                theme="dark"
                                extensions={[json()]}
                                onChange={(value) => setJsonInput(value)}
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
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 flex flex-col overflow-hidden">
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex justify-between items-center">
                            <h2 className="text-base font-medium text-gray-300">TOML Output</h2>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopy}
                                    disabled={!tomlOutput}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Copy size={14} />
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDownload}
                                    disabled={!tomlOutput}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Download size={14} />
                                    Download
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <CodeMirror
                                value={tomlOutput}
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
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-400 bg-red-950/50 px-3 py-1 rounded-md">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
