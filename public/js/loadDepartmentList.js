async function loadDepartmentSelect() {
  try {
    const resDept = await fetch("/departments/fetchDeptData");
    const deptListData = await resDept.json();

    if (deptListData.success && Array.isArray(deptListData.data)) {
      const select = document.getElementById("departmentList");
      select.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Chọn phòng ban";
      select.appendChild(defaultOption);

      deptListData.data.forEach((dept) => {
        const opt = document.createElement("option");
        opt.value = dept.id;
        opt.textContent = dept.name;
        select.appendChild(opt);
      });
    } else {
      console.warn("Không có dữ liệu phòng ban:", deptListData);
    }
  } catch (err) {
    console.error("Lỗi kết nối Cơ sở dữ liệu:", err);
  }
}
document.addEventListener("DOMContentLoaded", loadDepartmentSelect);
