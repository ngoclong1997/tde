import axios from 'axios'
import demoImage from '../../../images/khach-san.jpg'
import otherDemoImage from '../../../images/khach-san-1.jpg'

const sampleData = {
    data: [
        {
            id: 1,
            name: "Khách sạn 6 sao Marriott",
            price: "7.000.000",
            discount: 20,
            imageSource: demoImage,
            description: 'Có kiến trúc hiện đại và mặt tiền ấn tượng, JW Marriott Hotel Hanoi cung cấp các phòng nghỉ sang trọng ở phía Tây Hà Nội. Khách sạn 5 sao này nằm sát ngay một chiếc hồ của địa phương cạnh Trung tâm Hội nghị Quốc gia. Khách sạn có hồ bơi trong nhà lấp lánh, các địa điểm hội họp và 2 phòng khiêu vũ, 5 nhà hàng trong khuôn viên và trung tâm spa đầy đủ dịch vụ.'
        },
        {
            id: 2,
            name: "Khách sạn Hà Nội - Hanoi Hotel",
            price: "1.999.744",
            discount: 25,
            imageSource: otherDemoImage,
            description: 'Hanoi Hotel is the first international hotel in the Vietnamese Capital. With 218 deluxe rooms and suites overlooking the scenic Giang Vo Lake.'
        },
        {
            id: 3,
            name: "Khách Sạn Movenpick Hà Nội",
            price: "2.494.000",
            discount: 10,
            imageSource: demoImage,
            description: 'Mövenpick Hotel Hanoi is ideally located in the heart of Hanoi\'s business district, near Old Quarter and Noi Bai International Airport. Book today.'
        },
        {
            id: 4,
            name: "Khách sạn Hà Nội Daewoo - Hanoi Daewoo Hotel ",
            price: "2.269.000",
            discount: 15,
            imageSource: otherDemoImage,
            description: 'Khách sạn Daewoo là một khách sạn 5 sao nổi tiếng ở Hà Nội, được khánh thành năm 1996. Tọa lạc tại nằm ở số 360 Kim Mã, Ba Đình, được xem là khách sạn có số lượng phòng lớn nhất trong thành phố Hà Nội, khách sạn được trang trí theo phong cách nghệ thuật đương đại Việt Nam.'
        },
        {
            id: 5,
            name: "Khách sạn Hà Nội Metropole - Sofitel Legend Metropole Hotel ",
            price: "15.000.000",
            discount: 7,
            imageSource: demoImage
        },
        {
            id: 6,
            name: "Khách sạn 6 sao Marriott",
            price: "7.000.000",
            discount: 20,
            imageSource: otherDemoImage
        },
        {
            id: 7,
            name: "Khách sạn Hà Nội - Hanoi Hotel",
            price: "1.999.744",
            discount: 25,
            imageSource: demoImage
        },
        {
            id: 8,
            name: "Khách Sạn Movenpick Hà Nội",
            price: "2.494.000",
            discount: 10,
            imageSource: otherDemoImage
        },
        {
            id: 9,
            name: "Khách sạn Hà Nội Daewoo - Hanoi Daewoo Hotel ",
            price: "2.269.000",
            discount: 15,
            imageSource: demoImage
        },
        {
            id: 10,
            name: "Khách sạn Hà Nội Metropole - Sofitel Legend Metropole Hotel ",
            price: "15.000.000",
            discount: 7,
            imageSource: otherDemoImage
        }
    ]
}

export const getTopRecommendedRooms = async (typeID) => {
    try {
        console.log("========Get Recommended Rooms by Type=========")
        console.log(typeID)

        //call api
        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })

        return Promise.resolve(sampleData.data.slice(0, 5))
    } catch
        (err) {
        return Promise.reject(err)
    }
}

export const getRoomsByType = async (typeID) => {
    try {
        console.log("========Get Rooms by Type=========")
        console.log(typeID)

        //call api
        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })

        return Promise.resolve(sampleData.data)
    } catch
        (err) {
        return Promise.reject(err)
    }
}

