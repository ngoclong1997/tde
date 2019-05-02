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
        }
    ]
}

export const getRecommendedServices = async () => {
    try {
        console.log("========Get Recommended Services (Show at Home)=========")

        //call api
        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })

        return Promise.resolve(sampleData)
    } catch
        (err) {
        return Promise.reject(err)
    }
}
