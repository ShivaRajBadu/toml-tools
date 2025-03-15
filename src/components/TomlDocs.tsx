import React from 'react'
import { Book, Info, AlertCircle, Code2, Table2, Brackets, Type } from 'lucide-react'

export function TomlDocs() {
    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
            <div className=" mx-auto space-y-12">
                {/* Introduction */}
                <section className="intro-section">
                    <div className="flex items-center gap-3 mb-6">
                        <Book className="text-blue-400" size={28} />
                        <h2 className="text-2xl font-bold text-white">Understanding TOML</h2>
                    </div>
                    <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                        <p>
                            TOML (Tom's Obvious Minimal Language) is a simple configuration file format that's easy
                            to read and write. Think of it as a more powerful version of INI files.
                        </p>
                        <div className="flex gap-3 p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg">
                            <AlertCircle className="text-blue-400 shrink-0 mt-1" size={20} />
                            <div className="text-base text-blue-300">
                                Key things to remember:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>TOML is case-sensitive</li>
                                    <li>Files must be UTF-8 encoded</li>
                                    <li>Whitespace around keys and values is ignored</li>
                                    <li>Comments start with #</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Basic Syntax */}
                <section className="syntax-section">
                    <div className="flex items-center gap-3 mb-6">
                        <Code2 className="text-green-400" size={24} />
                        <h3 className="text-xl font-semibold text-white">Writing TOML</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Basic Key-Value Pairs</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`# Simple string
title = "My Project"

# Numbers
version = 1.0
port = 8080

# Boolean
enabled = true`}</pre>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Keys are on the left of the equals sign, values on the right.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Strings & Multiline</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`# Basic string
name = "TOML Example"

# Multiline string
description = """
This is a multiline
string that preserves
line breaks.
"""`}</pre>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Use triple quotes for multiline strings.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tables */}
                <section className="tables-section">
                    <div className="flex items-center gap-3 mb-6">
                        <Table2 className="text-orange-400" size={24} />
                        <h3 className="text-xl font-semibold text-white">Organizing with Tables</h3>
                    </div>
                    <div className="space-y-6">
                        <p className="text-gray-300">
                            Tables help you group related information together, similar to objects or dictionaries
                            in programming languages.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Basic Tables</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`[database]
host = "localhost"
port = 5432
user = "admin"

[server]
host = "example.com"
port = 8080`}</pre>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Nested Tables</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`[server.settings]
timeout = 30
max_connections = 100

[server.security]
ssl = true
cert = "cert.pem"`}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Arrays */}
                <section className="arrays-section">
                    <div className="flex items-center gap-3 mb-6">
                        <Brackets className="text-blue-400" size={24} />
                        <h3 className="text-xl font-semibold text-white">Working with Arrays</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Basic Arrays</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`colors = ["red", "green", "blue"]
numbers = [1, 2, 3]
nested = [[1, 2], [3, 4]]`}</pre>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Arrays can contain any type, but must be consistent.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-200">Array of Tables</h4>
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <pre className="text-gray-300 font-mono text-sm">
                                        {`[[fruits]]
name = "apple"
color = "red"

[[fruits]]
name = "banana"
color = "yellow"`}</pre>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Use double brackets for array of tables.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
} 