let orderList = [
    {
        orderId: "CIN-001",
        clientName: "Nguyễn Văn An",
        filmName: "Ánh Trăng Cuối Phố",
        quantity: 2,
        unitPrice: 90000,
        finalCost: 194400
    },
    {
        orderId: "CIN-002",
        clientName: "Trần Thị Bình",
        filmName: "Biệt Đội Sao Băng",
        quantity: 4,
        unitPrice: 90000,
        finalCost: 349920
    },
    {
        orderId: "CIN-003",
        clientName: "Lê Minh Châu",
        filmName: "Mùa Hè Rực Lửa",
        quantity: 6,
        unitPrice: 110000,
        finalCost: 641520
    }
];

function formatId(id) {
    return String(id).trim().toUpperCase();
}

function findOrder(id) {
    id = formatId(id);

    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].orderId === id) {
            return i;
        }
    }

    return -1;
}

function checkId(id) {
    if (id === null) {
        return "Hủy thao tác";
    }

    id = id.trim().toUpperCase();

    if (id === "") {
        return "Mã đơn không được để trống.";
    }

    if (id.length < 6) {
        return "Mã đơn phải có ít nhất 6 ký tự.";
    }

    if (!id.startsWith("CIN-")) {
        return "Mã đơn phải bắt đầu bằng CIN-.";
    }

    if (findOrder(id) !== -1) {
        return "Mã đơn đã tồn tại.";
    }

    return "";
}

function inputNumber(message, min) {
    while (true) {
        let value = prompt(message);

        if (value === null) {
            return null;
        }

        value = value.trim();
        let number = Number(value);

        if (value !== "" && Number.isInteger(number) && number >= min) {
            return number;
        }

        alert("Vui lòng nhập số hợp lệ.");
    }
}

function formatName(name) {
    let arr = name.trim().split(/\s+/);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase()
            + arr[i].slice(1).toLowerCase();
    }

    return arr.join(" ");
}

function showOrders() {
    if (orderList.length === 0) {
        console.log("Danh sách đơn đặt vé trống.");
        return;
    }

    let total = 0;

    console.log("===== DANH SÁCH ĐƠN ĐẶT VÉ =====");

    for (let i = 0; i < orderList.length; i++) {
        let order = orderList[i];

        console.log(
            `${i + 1}. ${order.orderId} | ` +
            `${order.clientName} | ` +
            `${order.filmName} | ` +
            `SL: ${order.quantity} | ` +
            `Giá: ${order.unitPrice} | ` +
            `Tổng: ${order.finalCost}`
        );

        total += order.finalCost;
    }

    console.log("Tổng số đơn:", orderList.length);
    console.log("Tổng doanh thu:", total);
}

function addOrder() {
    let id = prompt("Nhập mã đơn đặt vé:");

    if (id === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let error = checkId(id);

    if (error !== "") {
        console.log(error);
        return;
    }

    let client = prompt("Nhập tên khách hàng:");

    if (client === null) {
        console.log("Hủy thao tác.");
        return;
    }

    if (client.trim() === "") {
        console.log("Tên khách hàng không được để trống.");
        return;
    }

    let film = prompt("Nhập tên phim:");

    if (film === null) {
        console.log("Hủy thao tác.");
        return;
    }

    if (film.trim() === "") {
        console.log("Tên phim không được để trống.");
        return;
    }

    let quantity = inputNumber("Nhập số lượng vé:", 1);

    if (quantity === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let price = inputNumber("Nhập giá vé:", 1);

    if (price === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let money = quantity * price;

    if (quantity > 4) {
        money = money * 0.9;
    }

    let finalMoney = money * 1.08;

    let newOrder = {
        orderId: formatId(id),
        clientName: formatName(client),
        filmName: formatName(film),
        quantity: quantity,
        unitPrice: price,
        finalCost: finalMoney
    };

    orderList.push(newOrder);

    console.log("Thêm đơn đặt vé thành công.");
}

function updateOrder() {
    let id = prompt("Nhập mã đơn muốn cập nhật:");

    if (id === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let index = findOrder(id);

    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé.");
        return;
    }

    let quantity = inputNumber("Nhập số lượng vé mới:", 1);

    if (quantity === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let price = inputNumber("Nhập giá vé mới:", 1);

    if (price === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let money = quantity * price;

    if (quantity > 4) {
        money = money * 0.9;
    }

    let finalMoney = money * 1.08;

    orderList[index].quantity = quantity;
    orderList[index].unitPrice = price;
    orderList[index].finalCost = finalMoney;

    console.log("Cập nhật đơn đặt vé thành công.");
}

function deleteOrder() {
    let id = prompt("Nhập mã đơn muốn xóa:");

    if (id === null) {
        console.log("Hủy thao tác.");
        return;
    }

    let index = findOrder(id);

    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé.");
        return;
    }

    let answer = prompt("Bạn có chắc muốn xóa? (Y/N)");

    if (answer === null) {
        console.log("Hủy thao tác.");
        return;
    }

    if (answer.toUpperCase() === "Y") {
        orderList.splice(index, 1);
        console.log("Xóa đơn đặt vé thành công.");
    } else {
        console.log("Hủy thao tác.");
    }
}

function searchFilm() {
    let name = prompt("Nhập tên phim muốn tìm:");

    if (name === null) {
        console.log("Hủy thao tác.");
        return;
    }

    name = name.trim().toLowerCase();

    let found = false;

    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].filmName.toLowerCase().includes(name)) {
            console.log(
                "Mã đơn:",
                orderList[i].orderId
            );

            found = true;
        }
    }

    if (found === false) {
        console.log("Không tìm thấy phim.");
    }
}

function startApp() {
    let choice = "";

    do {
        choice = prompt(
            `===== MOONLIGHT CINEMA =====
1. Hiển thị danh sách
2. Thêm đơn đặt vé
3. Cập nhật đơn
4. Xóa đơn
5. Tìm kiếm theo tên phim
0. Thoát

Nhập lựa chọn:`
        );

        if (choice === null) {
            console.log("Chương trình kết thúc.");
            break;
        }

        switch (choice) {
            case "1":
                showOrders();
                break;

            case "2":
                addOrder();
                break;

            case "3":
                updateOrder();
                break;

            case "4":
                deleteOrder();
                break;

            case "5":
                searchFilm();
                break;

            case "0":
                console.log("Thoát chương trình.");
                break;

            default:
                alert("Lựa chọn không hợp lệ.");
        }

    } while (choice !== "0");
}

startApp();