import React from 'react'
import { BookOpen, Hash, Quote, Calendar, Brackets, Table2, AlertTriangle } from 'lucide-react'

export function TomlCheatSheet() {
    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Quick Reference */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="text-blue-400" size={24} />
                        <h2 className="text-xl font-bold text-white">TOML Quick Reference</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Types */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                                <Hash size={18} className="text-yellow-400" />
                                Basic Types
                            </h3>
                            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <div>
                                    <span className="text-purple-400 font-mono">String:</span>
                                    <pre className="mt-1 text-sm text-gray-300">str = "Hello World"</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Integer:</span>
                                    <pre className="mt-1 text-sm text-gray-300">int = 42
                                        hex = 0xDEADBEEF
                                        oct = 0o755
                                        bin = 0b11010110</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Float:</span>
                                    <pre className="mt-1 text-sm text-gray-300">float = 3.14
                                        inf = inf
                                        nan = nan</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Boolean:</span>
                                    <pre className="mt-1 text-sm text-gray-300">bool = true
                                        disabled = false</pre>
                                </div>
                            </div>
                        </div>

                        {/* Strings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                                <Quote size={18} className="text-green-400" />
                                String Variants
                            </h3>
                            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <div>
                                    <span className="text-purple-400 font-mono">Basic:</span>
                                    <pre className="mt-1 text-sm text-gray-300">str = "Hello\nWorld"</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Literal:</span>
                                    <pre className="mt-1 text-sm text-gray-300">path = 'C:\Users\me'</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Multiline:</span>
                                    <pre className="mt-1 text-sm text-gray-300">text = """
                                        Multi-line
                                        string
                                        """</pre>
                                </div>
                            </div>
                        </div>

                        {/* Arrays */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                                <Brackets size={18} className="text-blue-400" />
                                Arrays
                            </h3>
                            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <div>
                                    <span className="text-purple-400 font-mono">Inline:</span>
                                    <pre className="mt-1 text-sm text-gray-300">nums = [ 1, 2, 3 ]
                                        strs = [ "a", "b", "c" ]</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Multiline:</span>
                                    <pre className="mt-1 text-sm text-gray-300">nums = [
                                        1,
                                        2,
                                        3,
                                        ]</pre>
                                </div>
                            </div>
                        </div>

                        {/* Tables */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                                <Table2 size={18} className="text-orange-400" />
                                Tables
                            </h3>
                            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                                <div>
                                    <span className="text-purple-400 font-mono">Basic:</span>
                                    <pre className="mt-1 text-sm text-gray-300">[table]
                                        key = "value"</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Nested:</span>
                                    <pre className="mt-1 text-sm text-gray-300">[db.prod]
                                        host = "prod.db"</pre>
                                </div>
                                <div>
                                    <span className="text-purple-400 font-mono">Array of Tables:</span>
                                    <pre className="mt-1 text-sm text-gray-300">[[fruits]]
                                        name = "apple"

                                        [[fruits]]
                                        name = "banana"</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Gotchas */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="text-yellow-400" size={24} />
                        <h3 className="text-lg font-semibold text-white">Common Gotchas</h3>
                    </div>
                    <div className="bg-yellow-950/30 rounded-lg p-4">
                        <ul className="space-y-3 text-yellow-200/90 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                Keys are case-sensitive
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                You can't redefine a key that was already defined
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                Arrays must contain elements of the same type
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                Table names must be unique
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                Dotted keys create implicit tables
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
} 