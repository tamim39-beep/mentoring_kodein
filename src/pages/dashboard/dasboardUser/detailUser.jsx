import LayoutDashboard from "@/components/layout/layoutDashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserById } from "@/utils/api/users";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DetailUser() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const fetchUserById = async (id) => {
    try {
      const response = await getUserById(id);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  return (
    <LayoutDashboard>
      <div className="mb-5 font-bold text-[16px]">Detail User</div>
      <div className="space-y-8">
        <div>
          <Label>Nama Lengkap</Label>
          <Input disabled value={user.fullname} />
        </div>
        <div>
          <Label>Username</Label>
          <Input disabled value={user.username} />
        </div>
        <div>
          <Label>Email</Label>
          <Input disabled value={user.email} />
        </div>
        <div>
          <Label>Nomor Telepon</Label>
          <Input disabled value={user.phone_number} />
        </div>
        <div>
          <Label>Umur</Label>
          <Input disabled value={user.age} />
        </div>
        <div>
          <Label>Alamat</Label>
          <Input disabled value={user.address} />
        </div>
        <div>
          <Label>Role</Label>
          <Input disabled value={user.role} />
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default DetailUser;
