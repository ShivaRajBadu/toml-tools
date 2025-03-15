import React from 'react'
import { FileCode, Settings, Package, Workflow, Server, Database } from 'lucide-react'

const examples = [
    {
        title: "Cargo.toml (Rust Package Manager)",
        icon: <Package className="text-orange-400" size={20} />,
        description: "Used for Rust project dependencies and metadata",
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
        title: "pyproject.toml (Python Project Configuration)",
        icon: <Settings className="text-blue-400" size={20} />,
        description: "Modern Python project configuration using Poetry",
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
    {
        title: "GitHub Actions Workflow",
        icon: <Workflow className="text-purple-400" size={20} />,
        description: "GitHub Actions configuration using act tool",
        code: `[act]
workflow = "test"
container = "node:16-buster"

[env]
NODE_ENV = "test"
DATABASE_URL = "postgresql://localhost:5432/test"

[secrets]
GITHUB_TOKEN = "your-token-here"

[jobs.test]
steps = [
  "npm ci",
  "npm run build",
  "npm test"
]

[jobs.lint]
needs = ["test"]
steps = [
  "npm run lint",
  "npm run type-check"
]`
    },
    {
        title: "Config.toml (Web Server)",
        icon: <Server className="text-green-400" size={20} />,
        description: "Web server configuration example",
        code: `[server]
host = "0.0.0.0"
port = 8080
workers = 4
max_connections = 1000

[security]
ssl = true
cert_file = "/etc/ssl/cert.pem"
key_file = "/etc/ssl/key.pem"

[rate_limit]
enabled = true
requests_per_second = 10
burst = 50

[logging]
level = "info"
file = "/var/log/server.log"
format = "json"

[database]
url = "postgresql://user:pass@localhost/dbname"
pool_size = 20
timeout = 30

[cache]
type = "redis"
url = "redis://localhost:6379"
ttl = 3600`
    },
    {
        title: "Database Migration Config",
        icon: <Database className="text-yellow-400" size={20} />,
        description: "Database migration tool configuration",
        code: `[migrations]
directory = "migrations"
table_name = "schema_migrations"

[database.production]
url = "postgresql://user:pass@prod-db/app"
ssl = true
max_connections = 50

[database.staging]
url = "postgresql://user:pass@staging-db/app"
ssl = true
max_connections = 20

[database.development]
url = "postgresql://localhost/app"
ssl = false
max_connections = 10

[tools]
squash_migrations = true
backup_before_migrate = true

[hooks]
before_migrate = [
    "backup_database.sh",
    "notify_team.sh"
]
after_migrate = [
    "run_tests.sh",
    "cache_clear.sh"
]`
    }
]

export function TomlExamples() {
    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-8">
            <div className="flex items-center gap-2 mb-6">
                <FileCode className="text-blue-400" size={24} />
                <h2 className="text-xl font-bold text-white">Popular TOML Examples</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {examples.map((example, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center gap-2">
                            {example.icon}
                            <h3 className="text-lg font-semibold text-gray-200">{example.title}</h3>
                        </div>
                        <p className="text-gray-400">{example.description}</p>
                        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto">
                            <code className="text-sm text-gray-300">{example.code}</code>
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    )
} 