import React from "react";
import { MdClose, MdEmail, MdPersonAdd, MdCheck, MdLock, MdPerson } from "react-icons/md";
import { addEmployee } from "../../apis/userApi";

const AddMemberModal = ({ showModal, setShowModal, formData, setFormData, onEmployeeAdded }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = {
        email: formData.email,
        password: formData.password,
        nom: formData.nom,
        prenom: formData.prenom,
        role: "EMPLOYEE", // default role
      };

      console.log("Sending employee data:", employeeData);

      const addedEmployee = await addEmployee(employeeData);
      
      console.log("Employee added successfully:", addedEmployee);

      // Call callback if provided
      if (onEmployeeAdded) {
        onEmployeeAdded(addedEmployee);
      }

      // Reset form
      setFormData({ 
        email: "", 
        password: "", 
        nom: "", 
        prenom: "" 
      });
      
      setShowModal(false);

      // Show success message
      alert("تمت إضافة الموظف بنجاح");
      
    } catch (error) {
      console.error("Error adding employee:", error.response || error);
      
      // Show more detailed error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          "فشل إضافة الموظف، تحقق من البيانات وحاول مرة أخرى";
      
      alert(errorMessage);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MdPersonAdd className="text-blue-600" size={24} /> 
            إضافة عضو لفريق العمل
          </h2>
          <button 
            onClick={() => setShowModal(false)} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[calc(90vh-160px)] overflow-y-auto">
            
            {/* Nom (First Name) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الأول
              </label>
              <div className="relative">
                <MdPerson className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.nom || ""}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="محمد"
                  required
                />
              </div>
            </div>

            {/* Prenom (Last Name) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم العائلي
              </label>
              <div className="relative">
                <MdPerson className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.prenom || ""}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="بوكوش"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <MdLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password || ""}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="********"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MdCheck size={18} /> 
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;