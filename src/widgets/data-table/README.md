# Data Table Widget

```tsx
import { DataTable } from '@widgets/data-table'
```

## Usage

### Basic Example

```tsx
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

const data = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
  },
]

<DataTable
  columns={columns}
  data={data}
/>
```

## Props

### DataTableProps

| Prop       | Type        | Required | Description                     |
| ---------- | ----------- | -------- | ------------------------------- |
| columns    | ColumnDef[] | Yes      | Array of column definitions     |
| data       | any[]       | Yes      | Array of data to display        |
| className  | string      | No       | Additional CSS classes          |
| pagination | boolean     | No       | Whether to show pagination      |
| pageSize   | number      | No       | Number of items per page        |
| sorting    | boolean     | No       | Whether to enable sorting       |
| filtering  | boolean     | No       | Whether to enable filtering     |
| selection  | boolean     | No       | Whether to enable row selection |

## Examples

### With Pagination

```tsx
<DataTable columns={columns} data={data} pagination={true} pageSize={10} />
```

### With Sorting

```tsx
<DataTable columns={columns} data={data} sorting={true} />
```

### With Filtering

```tsx
<DataTable columns={columns} data={data} filtering={true} />
```

### With Row Selection

```tsx
<DataTable columns={columns} data={data} selection={true} />
```

### Custom Styling

```tsx
<DataTable columns={columns} data={data} className="rounded-lg border border-gray-200 shadow-sm" />
```

## Column Definition

Each column in the `columns` array should be a `ColumnDef` object with the following properties:

```tsx
{
  accessorKey: string; // Key to access data in your row
  header: string | function; // Column header
  cell: function; // Cell render function
  enableSorting?: boolean; // Enable sorting for this column
  enableHiding?: boolean; // Enable hiding for this column
  // ... other TanStack Table column options
}
```

## Filterable Columns

Define filterable columns in the config:

```tsx
filterableColumns: [
	{
		id: 'status',
		title: 'Status',
		options: [
			{ value: 'active', label: 'Active' },
			{ value: 'inactive', label: 'Inactive' }
		]
	}
]
```

## Custom Renderers

### Custom Toolbar

```tsx
renderToolbar: (table, props) => (
	<div className="flex items-center justify-between">
		<Input placeholder="Search..." value={props.searchQuery} onChange={e => props.setSearchQuery(e.target.value)} />
		{/* Custom toolbar content */}
	</div>
)
```

### Custom Row Actions

```tsx
renderRowActions: row => (
	<DropdownMenu modal={false}>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="sm">
				<MoreHorizontal className="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuItem onClick={() => handleEdit(row.original)}>Edit</DropdownMenuItem>
			<DropdownMenuItem onClick={() => handleDelete(row.original)}>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)
```

## Internationalization

The table supports internationalization through the `labels` prop:

```tsx
labels: {
  search: 'Search users...',
  filter: 'Filter',
  columns: 'Columns',
  noResults: 'No users found',
  rowsPerPage: 'Rows per page',
  page: 'Page',
  of: 'of',
  rowSelected: 'user selected',
  rowsSelected: 'users selected'
}
```
