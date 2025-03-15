import React from 'react'
import { FileText, Server, Database, Package, Settings, Cloud, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const templates = {
    server: `# Server Configuration Template
# This template provides a comprehensive server setup including
# core settings, security, performance, logging, and monitoring.

[server]
# Basic server configuration
host = "0.0.0.0"          # Listen on all interfaces
port = 8080               # Main application port
environment = "production"  # Environment (development/staging/production)
timezone = "UTC"          # Server timezone

[server.security]
# Security-related configurations
ssl = true                # Enable SSL/TLS
ssl_cert = "/path/to/cert.pem"    # SSL certificate path
ssl_key = "/path/to/key.pem"      # SSL private key path
allowed_origins = [       # CORS configuration
    "https://example.com",
    "https://api.example.com"
]
rate_limit = {           # Rate limiting settings
    enabled = true,
    requests_per_second = 10,
    burst = 50
}

[server.performance]
# Performance tuning parameters
workers = 4              # Number of worker processes
max_connections = 1000   # Maximum concurrent connections
keep_alive = 75         # Keep-alive timeout in seconds
read_timeout = 60       # Read timeout in seconds
write_timeout = 60      # Write timeout in seconds
max_request_size = "10MB" # Maximum request body size

[server.logging]
# Logging configuration
level = "info"           # Log level (debug/info/warn/error)
format = "json"          # Log format (json/text)
output = "file"          # Output destination (file/stdout)
file = "/var/log/app.log" # Log file path
rotation = {            # Log rotation settings
    max_size = "100MB",
    max_age = 30,       # days
    max_backups = 10
}

[server.monitoring]
# Application monitoring settings
metrics_enabled = true   # Enable metrics collection
metrics_path = "/metrics" # Metrics endpoint
health_check_path = "/health" # Health check endpoint
tracing = {             # Distributed tracing
    enabled = true,
    sampling_rate = 0.1
}

[server.cache]
# Caching configuration
type = "redis"          # Cache type (redis/memcached)
url = "redis://localhost:6379" # Cache server URL
ttl = 3600             # Default TTL in seconds
max_size = "1GB"       # Maximum cache size`,



    database: `# Database Configuration Template
# Comprehensive database configuration including connection pools,
# replication, backups, and monitoring settings.

[database]
# Primary database configuration
driver = "postgresql"    # Database driver (postgresql/mysql/mongodb)
host = "localhost"       # Database host
port = 5432             # Database port
name = "myapp"          # Database name
schema = "public"       # Database schema
charset = "UTF8"        # Character set
timezone = "UTC"        # Database timezone

[database.credentials]
# Authentication settings
username = "app_user"    # Database username
password = "secret"      # Database password
ssl_mode = "verify-full" # SSL mode (disable/require/verify-ca/verify-full)

[database.pool]
# Connection pool settings
min_connections = 5      # Minimum connections in pool
max_connections = 20     # Maximum connections in pool
idle_timeout = 300      # Connection idle timeout in seconds
max_lifetime = 3600     # Maximum connection lifetime in seconds
validation_query = "SELECT 1" # Connection validation query

[database.replication]
# Database replication configuration
enabled = true          # Enable replication
mode = "read-write-split" # Replication mode
read_replicas = [      # List of read replicas
    { host = "replica1.db", port = 5432, weight = 1 },
    { host = "replica2.db", port = 5432, weight = 1 }
]

[database.backup]
# Backup configuration
enabled = true          # Enable automated backups
type = "incremental"    # Backup type (full/incremental)
schedule = "0 0 * * *"  # Backup schedule (cron format)
retention = {          # Backup retention policy
    days = 30,         # Keep backups for 30 days
    full_backups = 7   # Keep 7 full backups
}
storage = {            # Backup storage configuration
    type = "s3",       # Storage type (local/s3/gcs)
    bucket = "backups",
    path = "/db/daily/"
}

[database.monitoring]
# Database monitoring settings
enable_metrics = true   # Enable metric collection
slow_query_threshold = 1000 # Slow query threshold in milliseconds
log_queries = true     # Enable query logging
statement_timeout = 30000 # Statement timeout in milliseconds

[database.maintenance]
# Database maintenance settings
vacuum_schedule = "0 2 * * 0" # Weekly vacuum schedule
analyze_schedule = "0 3 * * *" # Daily analyze schedule
temp_file_limit = "5GB"    # Temporary file size limit`,



    app: `# Application Configuration Template
# Complete application configuration including features,
# integrations, caching, and security settings.

[app]
# Core application settings
name = "MyApp"           # Application name
version = "1.0.0"        # Application version
environment = "production" # Environment name
debug = false            # Debug mode flag

[app.features]
# Feature flags and configurations
authentication = true    # Enable authentication
authorization = true     # Enable authorization
caching = true          # Enable caching
rate_limiting = true    # Enable rate limiting
metrics = true          # Enable metrics collection
notifications = true    # Enable notifications

[app.security]
# Security settings
secret_key = "your-secret-key"  # Application secret key
jwt = {                 # JWT configuration
    algorithm = "HS256",
    expire_hours = 24,
    refresh_days = 7
}
password_policy = {     # Password policy
    min_length = 8,
    require_uppercase = true,
    require_numbers = true,
    require_special = true
}
cors = {               # CORS settings
    allowed_origins = ["https://app.example.com"],
    allowed_methods = ["GET", "POST", "PUT", "DELETE"],
    allow_credentials = true
}

[app.cache]
# Caching configuration
driver = "redis"        # Cache driver
url = "redis://localhost:6379" # Cache server URL
default_ttl = 3600     # Default TTL in seconds
prefix = "myapp:"      # Cache key prefix
patterns = {           # Cache patterns
    user = 3600,       # User cache TTL
    session = 86400,   # Session cache TTL
    static = 604800    # Static content cache TTL
}

[app.email]
# Email configuration
driver = "smtp"         # Email driver
host = "smtp.example.com" # SMTP host
port = 587             # SMTP port
encryption = "tls"     # Encryption type
from_address = "noreply@example.com" # Default from address
templates_path = "/app/templates/email" # Email templates path

[app.storage]
# File storage configuration
driver = "s3"          # Storage driver
bucket = "myapp-files" # Storage bucket
region = "us-east-1"   # Storage region
public_url = "https://cdn.example.com" # Public URL
allowed_types = [      # Allowed file types
    "image/jpeg",
    "image/png",
    "application/pdf"
]
max_file_size = "10MB" # Maximum file size

[app.logging]
# Logging configuration
level = "info"         # Log level
format = "json"        # Log format
outputs = [            # Log outputs
    { type = "file", path = "/var/log/app.log" },
    { type = "stdout" }
]
exclude_paths = [      # Paths to exclude from logging
    "/health",
    "/metrics"
]

[app.integrations]
# Third-party integrations
sentry = {            # Sentry error tracking
    enabled = true,
    dsn = "https://sentry.example.com",
    environment = "production"
}
newrelic = {          # New Relic monitoring
    enabled = true,
    license_key = "your-license-key",
    app_name = "MyApp"
}`,




    deployment: `# Deployment Configuration Template
# Comprehensive deployment configuration including
# infrastructure, scaling, and service discovery.

[deployment]
# Core deployment settings
name = "myapp"          # Deployment name
region = "us-east-1"    # Deployment region
environment = "production" # Environment name
version = "1.0.0"       # Application version

[deployment.kubernetes]
# Kubernetes deployment configuration
namespace = "myapp"     # Kubernetes namespace
replicas = 3           # Number of replicas
image = "myapp:1.0.0"  # Container image
pull_policy = "Always" # Image pull policy

resources = {          # Resource limits
    requests = {
        cpu = "100m",
        memory = "256Mi"
    },
    limits = {
        cpu = "500m",
        memory = "512Mi"
    }
}

[deployment.scaling]
# Auto-scaling configuration
enabled = true         # Enable auto-scaling
min_replicas = 2      # Minimum replicas
max_replicas = 10     # Maximum replicas
target_cpu = 80       # Target CPU utilization
target_memory = 80    # Target memory utilization

[deployment.networking]
# Network configuration
ingress_enabled = true # Enable ingress
domain = "api.example.com" # Service domain
tls_enabled = true    # Enable TLS
ports = {            # Service ports
    http = 80,
    https = 443,
    metrics = 9090
}

[deployment.monitoring]
# Monitoring configuration
prometheus = {        # Prometheus configuration
    enabled = true,
    scrape_interval = "15s",
    retention = "15d"
}
grafana = {          # Grafana configuration
    enabled = true,
    domain = "metrics.example.com"
}

[deployment.secrets]
# Secrets management
provider = "vault"    # Secrets provider
path = "myapp/prod"  # Secrets path
rotation_enabled = true # Enable secret rotation
rotation_interval = "30d" # Rotation interval`


}

interface TemplateProps {
    onSelect: (template: string) => void
}

export function TomlTemplates({ onSelect }: TemplateProps) {
    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
                <FileText className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">TOML Templates</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Server className="text-green-400" size={20} />
                        <h4 className="text-lg font-medium text-white">Server Config</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                        Complete server configuration including security, performance, and monitoring.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => onSelect(templates.server)}
                    >
                        Use Template
                    </Button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Database className="text-blue-400" size={20} />
                        <h4 className="text-lg font-medium text-white">Database Config</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                        Database configuration with replication, backups, and monitoring.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => onSelect(templates.database)}
                    >
                        Use Template
                    </Button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Settings className="text-purple-400" size={20} />
                        <h4 className="text-lg font-medium text-white">App Config</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                        Application configuration with features, integrations, and security.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => onSelect(templates.app)}
                    >
                        Use Template
                    </Button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Cloud className="text-indigo-400" size={20} />
                        <h4 className="text-lg font-medium text-white">Deployment Config</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                        Deployment configuration for cloud infrastructure and scaling.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() => onSelect(templates.deployment)}
                    >
                        Use Template
                    </Button>
                </div>
            </div>
        </div>
    )
} 