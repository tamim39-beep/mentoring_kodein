import DataTable from "@/components/dataTable";
import { columns } from "@/utils/dataUser/columsUser";
import { data } from "@/utils/dataUser/dataUser";

export default function Dashboard() {

  return (
    <DataTable columns={columns} data={data} />
  );
}
