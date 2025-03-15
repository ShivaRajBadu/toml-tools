"use client"

import { AlertCircle, FileCode, FileJson, GitCompare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="bg-gray-900 border-b border-gray-800 shrink-0 py-4">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <a href="/">
                            <h1 className="text-xl font-bold text-white">TOML Viewer</h1>
                        </a>
                        <nav className="hidden md:flex space-x-4">
                            <Link
                                href="/compare"
                                className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <GitCompare size={18} />
                                Compare
                            </Link>
                            <Link
                                href="/convert"
                                className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <FileJson size={18} />
                                Convert to
                            </Link>
                            <Link
                                href="/json-to-toml"
                                className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <FileJson size={18} />
                                JSON to TOML
                            </Link>
                            <Link
                                href="/validate"
                                className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <AlertCircle size={18} />
                                Validate
                            </Link>
                            <Link
                                href="/examples"
                                className="flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <FileCode size={18} />
                                Examples
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
