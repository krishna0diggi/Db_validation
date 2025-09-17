import React, { useEffect, useState } from 'react'
import DataTable from "datatables.net-react";
import DataTablesCore from 'datatables.net-dt'
import Button from '@/components/ui/Button';
import { toast, ToastContainer } from "react-toastify";
import AddDatabaseCredentials from './AddDatabaseCredentials';

DataTable.use(DataTablesCore)

const dialects = [
  "mssql2012",
  "mssql2005",
  "mysql56",
  "mysql502",
  "oracle11",
  "oracle9",
  "postgres96",
  "postgres9",
  "sqlite312",
  "sqlite3716",
  "actian",
  "athena",
  "aurora-dsql",
  "redshift",
  "drill",
  "druid",
  "hive",
  "solr",
  "clickhouse",
  "cockroachdb",
  "cratedb",
  "databend",
  "denodo",
  "exasol",
  "elasticsearch",
  "firebird",
  "firebolt",
  "bigquery",
  "gsheets",
  "greenplum",
  "hsqldb",
  "ibm-db2",
  "netezza",
  "impala",
  "kinetica",
  "access",
  "mssql-pytds",
  "mssql-turbodbc",
  "monetdb",
  "opengauss",
  "rockset",
  "sap-ase",
  "sap-hana",
  "sqlanywhere",
  "snowflake",
  "teradata",
  "tidb",
  "ydb",
  "yugabytedb"
];

// const targetDialects = ["databricks"]

const CredentialPage = () => {
    const [loading, setLoading] = useState(true);
    const [jobData, setJobData] = useState<any[]>([]);
    const [selectedJobData, setSelectedJobData] = useState<any[] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selectedRowId, setSelectedRowId] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        source: "postgres",
        connectionUrl: "",
        username: "",
        password: "",
    })
    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

const sampleData = [
    {
        id: 1,
        name: "User Analytics ETL",
        source: "PostgreSQL",
        connectionUrl: "postgresql://analytics-db.company.com:5432/source_db",
        username: "analytics_user",
        password: "securePass123"
    },
    {
        id: 2,
        name: "Sales Report Sync",
        source: "MySQL",
        connectionUrl: "mysql://sales-db.company.com:3306/sales_data",
        username: "sales_admin",
        password: "sales@2025"
    },
    {
        id: 3,
        name: "Inventory Migration",
        source: "SQLServer",
        connectionUrl: "sqlserver://inventory-sql.company.com:1433/legacy_inventory",
        username: "inv_migrate",
        password: "Inv#Pass!45"
    },
    {
        id: 4,
        name: "Marketing Insights Load",
        source: "Oracle",
        connectionUrl: "oracle://oracle-db.company.com:1521/mktg",
        username: "mktg_loader",
        password: "Oracle!2025"
    },
    {
        id: 5,
        name: "Customer Data Warehouse",
        source: "Snowflake",
        connectionUrl: "snowflake://sf-db.company.com:443/customer_dw",
        username: "cust_dw_user",
        password: "Snow1234!"
    },
    {
        id: 6,
        name: "Finance Ledger Sync",
        source: "BigQuery",
        connectionUrl: "bigquery://bq-project.company.com:443/finance_ledger",
        username: "finance_sync",
        password: "BQpass#567"
    },
    {
        id: 7,
        name: "Product Catalog Import",
        source: "MongoDB",
        connectionUrl: "mongodb://mongo-db.company.com:27017/product_catalog",
        username: "catalog_user",
        password: "mongo@Pwd99"
    },
    {
        id: 8,
        name: "Log Data Stream",
        source: "Druid",
        connectionUrl: "druid://druid-db.company.com:8082/logs",
        username: "log_admin",
        password: "Druid!456"
    },
    {
        id: 9,
        name: "HR Payroll System",
        source: "SQLite",
        connectionUrl: "sqlite://localhost/hr_payroll.db",
        username: "hr_admin",
        password: "SQLite@Pwd"
    },
    {
        id: 10,
        name: "Supply Chain Dashboard",
        source: "Redshift",
        connectionUrl: "redshift://redshift-cluster.company.com:5439/supply_chain",
        username: "supply_user",
        password: "RedShift#999"
    }
];


            setJobData(sampleData);
            setLoading(false);
        };

        fetchData();
    }, []);
    const handleAddOrEdit = async () => {
        setIsDialogOpen(false)
        const payload = {
            name: formData.name,
            source:formData.source,
            connectionUrl: formData.connectionUrl,
            username: formData.username,
            password: formData.password
        }
        try{
            // if (!isEdit && selec)

        }
        catch(err:any)
        {
            toast.error(err.message || 'Something went wrong!')
        }


    }

    // console.log("Check value of setDialog boolean value", isDialogOpen)
    // console.log("Row Id is selectd ", selectedRowId);
    

    useEffect(() => {
        if (!loading) {
            const table = document.querySelector(".dataTable") as HTMLElement;
            const handleTableClick = async (e: any) => {
                const target = e.target;
                const id = target.getAttribute("data-id");
                // console.log("Clicked row ID:", id);
                // console.log(target.classList.contains("view-details"));


                if (target.classList.contains("view-details")) {
                    const selected = jobData.find((item) => item.id == id);
                    setSelectedJobData(selected);
                    // console.log("After selecting the values", selected);
                    if (selected) {
                        setSelectedRowId(selected.id);
                    }
                    setIsEdit(true);
                    
                    setIsDialogOpen(true);
                    // console.log("View details is clicked", selected);
                    // You can add more logic here to handle the click event
                }
            };
            table?.addEventListener("click", handleTableClick);
            return () => {
                table?.removeEventListener("click", handleTableClick)
            };
        }

    }, [loading, jobData])

    const columns = [
        { title: "Job Name", data: "name" },
        { title: "Database URL ", data: "connectionUrl" },
          { title: "Source", data: "name" },
        { title: "Username ", data: "username" },

        {
            title: "Action", data: null, orderable: false, render: function (data: any, type: any, row: any) {
                return `<button class='view-details underline text-blue-600 hover:text-blue-800' data-id='${row.id}' type='button' aria-label='View Details'>Edit</button>`;
            }
        },
        {
            title: "Action", data: null, orderable: false, render: function (data: any, type: any, row: any) {
                return `<button class='connect underline text-blue-600 hover:text-blue-800' data-id='${row.id}' type='button' aria-label='connect'>Connect</button>`;
            }
        },
        
    ]
    return (
        <div className=" min-h-screen bg-gray-100 p-8 ">
            {/* <div className='p-2 border-b border-gray-200 mb-2 text-center'>
                <h1 className='text-2xl font-bold text-red-600'>SQL Dialect Converter</h1>
                <span className='text-gray-600'>
                    Convert SQL queries into databricks dialects with ease
                </span>
            </div> */}

            <div className="flex justify-end items-center mb-6">
                {/* <h2 className="text-2xl">SQL Dialect Converter</h2> */}
                {/* <span className='text-gray-600'>
                    Convert SQL queries into databricks dialects with ease
                </span> */}
                <Button
                    variant="primary"
                    onClick={() => {
                        setIsDialogOpen(true);
                        setSelectedJobData(null);
                        setIsEdit(false)

                    }}
                >
                    Create Connection
                </Button>
            </div>

            {/* <div>
                <AddFileToConvert />
            </div> */}

            <div className=' bg-white rounded-xl shadow p-6 overflow-x-auto'>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DataTable
                        data={jobData}
                        columns={columns}
                        className="stripe hover"
                        options={{
                            order: [[0, 'desc']],
                            dom: `
                <'flex flex-col md:flex-row justify-between items-center gap-4 mb-4'lf>
                <'overflow-x-auto't>
                <'flex flex-col md:flex-row justify-between items-center gap-4 mt-4'ip>
              `,
                            paging: true,
                            searching: true,
                            lengthChange: true,
                            info: true,
                        }}
                    />
                )}

            </div>

            <AddDatabaseCredentials
                visible={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setSelectedJobData(null);
                }}
                onSubmit={handleAddOrEdit}
              
                dialects = {dialects}
                isEdit = {isEdit}
                formData = {formData}
                setFormData = {setFormData}
                initialData={selectedJobData}
            />
        </div>
    )
}

export default CredentialPage