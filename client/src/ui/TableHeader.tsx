type TTableHeaderProps = {
    columnsNames: string[];
    hasEdit?: boolean;
    hasDelete?: boolean;
}
const TableHeader = ({columnsNames, hasEdit, hasDelete}: TTableHeaderProps) => {

    return (
        <thead>
        <tr>
            {
                columnsNames.map((columnName, index) => (
                    <th
                        key={index}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                        {columnName}
                    </th>
                ))
            }

            {
                hasEdit &&
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                </th>
            }

            {
                hasDelete &&
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Delete</span>
                </th>
            }
        </tr>
        </thead>
    )
}

export default TableHeader
