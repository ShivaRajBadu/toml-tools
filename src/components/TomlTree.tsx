import React from 'react'
import { ChevronRight, ChevronDown, Square, CircleSlash, CircleDot, Hash, Quote, Table2 } from 'lucide-react'

interface TreeNodeProps {
    data: any
    label?: string
    depth?: number
}

const TreeNode: React.FC<TreeNodeProps> = ({ data, label, depth = 0 }) => {
    const [isOpen, setIsOpen] = React.useState(true)
    const isObject = data && typeof data === 'object' && !Array.isArray(data)
    const isArray = Array.isArray(data)
    const hasChildren = isObject || isArray
    const indent = depth * 20 // pixels per level

    const getValueDisplay = (value: any) => {
        if (typeof value === 'string') {
            return (
                <span className="flex items-center gap-2">
                    <Quote size={14} className="text-blue-400" />
                    <span className="text-green-400">{value}</span>
                </span>
            )
        }
        if (typeof value === 'number') {
            return (
                <span className="flex items-center gap-2">
                    <Hash size={14} className="text-yellow-400" />
                    <span className="text-yellow-400">{value}</span>
                </span>
            )
        }
        if (typeof value === 'boolean') {
            return (
                <span className="flex items-center gap-2">
                    {value ? (
                        <CircleDot size={14} className="text-purple-400" />
                    ) : (
                        <CircleSlash size={14} className="text-purple-400" />
                    )}
                    <span className="text-purple-400">{String(value)}</span>
                </span>
            )
        }
        return String(value)
    }

    if (!hasChildren) {
        return (
            <div
                className="flex items-center py-1 hover:bg-gray-800/50 rounded px-2 group"
                style={{ marginLeft: `${indent}px` }}
            >
                <span className="text-gray-400 mr-2">{label}:</span>
                {getValueDisplay(data)}
            </div>
        )
    }

    return (
        <div>
            <div
                className="flex items-center py-1.5 cursor-pointer hover:bg-gray-800/50 rounded px-2 group text-[15px]"
                style={{ marginLeft: `${indent}px` }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="mr-2 text-gray-500">
                    {isOpen ? (
                        <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                        <ChevronRight size={16} className="text-gray-400" />
                    )}
                </span>
                <span className="flex items-center gap-2">
                    {isArray ? (
                        <Square size={14} className="text-blue-400" />
                    ) : (
                        <Table2 size={14} className="text-orange-400" />
                    )}
                    <span className="font-medium text-gray-200">
                        {label}
                        {isArray && <span className="text-gray-500 ml-2">[{data.length}]</span>}
                    </span>
                </span>
            </div>

            {isOpen && (
                <div>
                    {isObject &&
                        Object.entries(data).map(([key, value]) => (
                            <TreeNode
                                key={key}
                                data={value}
                                label={key}
                                depth={depth + 1}
                            />
                        ))}
                    {isArray &&
                        data.map((item: any, index: number) => (
                            <TreeNode
                                key={index}
                                data={item}
                                label={`${index}`}
                                depth={depth + 1}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

interface TomlTreeProps {
    data: any
}

const TomlTree: React.FC<TomlTreeProps> = ({ data }) => {
    if (!data) return null

    return (
        <div className="font-mono text-sm">
            <TreeNode data={data} label="root" depth={0} />
        </div>
    )
}

export default TomlTree 