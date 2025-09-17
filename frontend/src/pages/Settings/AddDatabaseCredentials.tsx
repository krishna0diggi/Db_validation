import { X } from "lucide-react";
import React, { useEffect } from "react";

interface AddorEditProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    initialData?: any;
    isEdit: boolean;
    formData: {
        name: string;
        source: string;
        connectionUrl: string;
        username: string;
        password: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            name: string;
            source: string;
            connectionUrl: string;
            username: string;
            password: string;
        }>
    >;
    dialects: string[];
}

const AddDatabaseCredentials: React.FC<AddorEditProps> = ({
    visible,
    onClose,
    onSubmit,
    formData,
    setFormData,
    initialData,
    dialects,
    isEdit,
}) => {
    useEffect(() => {
        if (visible) {
            if (isEdit && initialData) {
                setFormData({
                    name: initialData.name || "",
                    source: initialData.source || "",
                    connectionUrl: initialData.connectionUrl || "",
                    username: initialData.username || "",
                    password: initialData.password || "",
                });
            } else if (!isEdit) {
                setFormData({
                    name: "",
                    source: "",
                    connectionUrl: "",
                    username: "",
                    password: "",
                });
            }
        }
    }, [isEdit, initialData, visible, setFormData]);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-10 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-6">
                    <h2 className="text-xl font-semibold">
                        {isEdit ? "Edit Job" : "Create Job"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Job Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Job Name</label>
                    <input
                        type="text"
                        placeholder="Eg: Convert Postgres to Databricks"
                        className="border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 rounded-lg p-2 w-full outline-none transition"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </div>

                {/* Source */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Source</label>
                    <select
                        value={formData.source}
                        onChange={(e) =>
                            setFormData({ ...formData, source: e.target.value })
                        }
                        className="border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 rounded-lg p-2 w-full outline-none transition"
                    >
                        <option value="">-- Select Source --</option>
                        {dialects.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Connection URL */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Connection URL</label>
                    <input
                        type="text"
                        placeholder="Eg: jdbc:postgresql://localhost:5432/sqlalchemy"
                        className="border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 rounded-lg p-2 w-full outline-none transition"
                        value={formData.connectionUrl}
                        onChange={(e) =>
                            setFormData({ ...formData, connectionUrl: e.target.value })
                        }
                    />
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 rounded-lg p-2 w-full outline-none transition"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 rounded-lg p-2 w-full outline-none transition"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(formData)}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        {isEdit ? "Update" : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDatabaseCredentials;
