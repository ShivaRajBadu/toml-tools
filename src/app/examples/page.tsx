'use client'

import Link from 'next/link'
import { ArrowLeft, Package, Settings, Workflow, Server, Database, Info } from 'lucide-react'
import type { Metadata } from 'next'

const DetailedExamples = [
    {
        id: 'cargo',
        title: "Cargo.toml (Rust Package Manager)",
        icon: <Package className="text-orange-400" size={20} />,
        description: "Cargo.toml is the manifest file for Rust's package manager. It contains all the metadata and dependencies for a Rust project.",
        details: [
            {
                section: "[package]",
                explanation: "The package section defines metadata about your Rust project:",
                fields: [
                    { key: "name", desc: "The name of your package (must be unique on crates.io)" },
                    { key: "version", desc: "Current version following semantic versioning" },
                    { key: "edition", desc: "Specifies the Rust edition (2015, 2018, or 2021)" },
                    { key: "authors", desc: "List of package authors" },
                    { key: "description", desc: "Package description for documentation" }
                ]
            },
            {
                section: "[dependencies]",
                explanation: "Lists all runtime dependencies with their version requirements:",
                fields: [
                    { key: "serde", desc: "Serialization framework with feature flags" },
                    { key: "tokio", desc: "Async runtime with optional features" }
                ]
            },
            {
                section: "[profile.release]",
                explanation: "Configuration for release builds:",
                fields: [
                    { key: "opt-level", desc: "Optimization level (0-3, s, or z)" },
                    { key: "lto", desc: "Link-time optimization flag" }
                ]
            }
        ],
        code: `[package]
name = "my-rust-app"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
description = "A sample Rust application"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["full"] }
axum = "0.6"
tower = "0.4"

[dev-dependencies]
pretty_assertions = "1.0"

[profile.release]
opt-level = 3
lto = true`
    },
    {
        id: 'pyproject',
        title: "pyproject.toml (Python Project)",
        icon: <Settings className="text-blue-400" size={20} />,
        description: "Modern Python project configuration using Poetry for dependency management and build system specification.",
        details: [
            {
                section: "[tool.poetry]",
                explanation: "Poetry-specific configuration for Python projects:",
                fields: [
                    { key: "name", desc: "Project name (used in package creation)" },
                    { key: "version", desc: "Project version" },
                    { key: "description", desc: "Project description" },
                    { key: "authors", desc: "List of project authors" },
                    { key: "packages", desc: "Specifies which packages to include" }
                ]
            },
            {
                section: "[tool.poetry.dependencies]",
                explanation: "Project dependencies with version constraints:",
                fields: [
                    { key: "python", desc: "Required Python version (^3.9 means >=3.9, <4.0)" },
                    { key: "fastapi", desc: "Web framework dependency" },
                    { key: "sqlalchemy", desc: "Database ORM dependency" }
                ]
            },
            {
                section: "[build-system]",
                explanation: "Specifies the build system requirements:",
                fields: [
                    { key: "requires", desc: "Tools needed to build the project" },
                    { key: "build-backend", desc: "The build backend to use" }
                ]
            }
        ],
        code: `[tool.poetry]
name = "my-python-project"
version = "0.1.0"
description = "A sample Python project"
authors = ["Your Name <you@example.com>"]
readme = "README.md"
packages = [{include = "my_package"}]

[tool.poetry.dependencies]
python = "^3.9"
fastapi = "^0.95.0"
sqlalchemy = "^2.0.0"
pydantic = "^1.10.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.3.1"
black = "^23.3.0"
mypy = "^1.3.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"`
    },
    // ... more examples with their detailed explanations ...
]

// export const metadata: Metadata = {
//     title: 'TOML Examples - Common TOML Configuration Examples & Templates',
//     description: 'Comprehensive TOML examples and templates for common use cases including server configuration, database settings, application config, and deployment setup.',
//     keywords: 'TOML examples, TOML templates, configuration examples, TOML format, server config, database config',
// }

export default function Examples() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <h1 className="text-2xl font-bold text-white text-center py-4">TOML Examples</h1>

            <div className="flex-1 container mx-auto px-4 py-6">
                <div className="max-w-[1200px] mx-auto space-y-12">
                    {DetailedExamples.map((example) => (
                        <div key={example.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
                            <div className="flex items-center gap-3">
                                {example.icon}
                                <h2 className="text-xl font-bold text-white">{example.title}</h2>
                            </div>

                            <p className="text-gray-300">{example.description}</p>

                            <div className="space-y-6">
                                {example.details.map((detail, index) => (
                                    <div key={index} className="space-y-3">
                                        <h3 className="text-lg font-semibold text-gray-200">
                                            {detail.section}
                                        </h3>
                                        <p className="text-gray-400">{detail.explanation}</p>
                                        <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                                            {detail.fields.map((field, fieldIndex) => (
                                                <div key={fieldIndex} className="flex items-start gap-2">
                                                    <Info size={16} className="text-blue-400 mt-1 shrink-0" />
                                                    <div>
                                                        <span className="text-blue-400 font-mono">{field.key}</span>
                                                        <span className="text-gray-300 mx-2">-</span>
                                                        <span className="text-gray-400">{field.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-200 mb-3">Complete Example:</h3>
                                <pre className="bg-gray-800 p-4 rounded-lg overflow-auto">
                                    <code className="text-sm text-gray-300">{example.code}</code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 