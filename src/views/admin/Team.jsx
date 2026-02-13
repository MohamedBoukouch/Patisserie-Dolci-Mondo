import React, { useState, useEffect } from 'react';
import { 
  MdPersonAdd, 
  MdEmail, 
  MdEdit, 
  MdDelete, 
  MdSend,
  MdPerson
} from 'react-icons/md';
import AddMemberModal from '../../components/admin/AddMemberModal';
import { fetchEmployees, deleteEmployee } from '../../apis/userApi';

const Team = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: ''
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('accounts');

  // Fetch employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const employees = await fetchEmployees();
      setTeamMembers(employees);
    } catch (error) {
      console.error("Error loading employees:", error);
      alert("فشل تحميل الموظفين");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAdded = (newEmployee) => {
    // Add new employee to the list
    setTeamMembers([...teamMembers, newEmployee]);
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      return;
    }

    try {
      await deleteEmployee(id);
      // Remove from list
      setTeamMembers(teamMembers.filter(member => member.id !== id));
      alert("تم حذف الموظف بنجاح");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("فشل حذف الموظف");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MdPerson className="text-blue-600" size={32} />
                إدارة الفريق
              </h1>
              <p className="text-gray-600 mt-2">إدارة أعضاء الفريق والصلاحيات</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MdPersonAdd size={20} />
              <span>إضافة عضو جديد</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'accounts'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              حسابات فريق العمل
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'management'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              إدارة الحساب
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">#</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">الاسم الكامل</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">البريد الإلكتروني</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">الدور</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamMembers.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MdPerson className="text-gray-400" size={18} />
                          <span className="text-sm text-gray-900 font-medium">
                            {member.nom} {member.prenom}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MdEmail className="text-gray-400" size={18} />
                          <span className="text-sm text-gray-900">{member.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          member.role === 'SUPERVISOR' 
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {member.role === 'SUPERVISOR' ? 'مشرف' : 'موظف'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="تعديل"
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            title="إرسال دعوة"
                          >
                            <MdSend size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="حذف"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {teamMembers.length === 0 && !loading && (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <MdPerson className="text-gray-300" size={64} />
                          <p className="text-lg font-medium text-gray-900">لا توجد أعضاء في الفريق</p>
                          <p className="text-sm text-gray-500">قم بإضافة أعضاء جدد لفريقك</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal Component */}
      <AddMemberModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
};

export default Team;