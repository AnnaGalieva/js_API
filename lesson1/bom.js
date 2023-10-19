console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.geolocation);

// ○ userAgent — информация о браузере;
// ○ cookieEnabled — включены ли coockie;
// ○ doNotTrack — включена ли опция запрета на отслеживание;
// ○ platform — текущая ОС пользователя;
// ○ geolocation — геолокация, в данном случае не активированная.

//напишите функцию findClosestCity(userLocation, cities),которая принимает текущее местоположение пользователя в формате [latitude, longitude] и массив городов с их координатами в формате{name:'City',location:[latitude, longitude]}.Функция должна вернуть название ближайшего города к пользователю

console.log(location);
location.href = './first.html';//переход на страницу
function calculateDistance(location1, location2) {
    const [lat1, lon1] = location1;//разбивает координаты первого мстоположения на широту и долготу
    const [lat2, lon2] = location2;//разбивает координаты второго мстоположения на широту и долготу
    const toRad = value => (value * Math.PI) / 180;//преобразует значение в радианы
    const R = 6371;//радиус Земли в км
    const dLat = toRad(lat2 - lat1);//вычисляет разницу широты в радианах
    const dLon = toRad(lon2 - lon1);//вычисляет разницу долготы в радианах
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +//вычисляет квадрат синуса половины разницы широты
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //вычисляет квадрат синуса половины разницы долготы и учитывает косинус широт
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //вычисляет центральный угол между двумя местоположениями
    const distance = R * c;//вычисляет расстояние между двумя местоположениями на сфере Земли
    return distance;//возвращает расстояние между местоположениями 
}
function findFastestCity(cities) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {//проверяет поддержку геолокации в браузере 
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = [position.coords.latitude, position.coords.longitude];
                    //получает текущие координаты пользователя
                    let clisestCity = null;//переменная для хранения ближайшего города
                    let shortesDistance = Infinity;//переменная для хранения кратчайшего расстояния
                    cities.forEach(city => {//перебирает все города из массива cities
                        const distance = calculateDistance(userLocation, city.location);
                        //вычисляет расстояние между местоположением пользователя  и текущем городом
                        if (distance < shortesDistance) {//если расстояние меньше кратчайшего расстояния
                            clisestCity = city.name;//записывает имя текущего города в clisestCity
                            shortesDistance = distance;//записывает текущее расстояние в shortesDistance
                        }
                    });
                    resolve(clisestCity);//возвращает ближайший город
                },
                error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        //если пользователь отказал в доступе к геолокации
                        reject(new Error('пользователь отказал в доступе к геолокации'));//возвращает ошибку    
                    } else {
                        reject(new Error('Ошибка при получении местоположения'));
                        //возвращает ошибку  
                    }
                }
            );

        } else {
            reject(new Error('геолокация не поддерживается вашим браузером'));//возвращает ошибку 
        }
    });
}
//пример использования
const cities = [
    { name: 'NY', location: [40.7128, -74.0060] },
    { name: 'Lo', location: [50.5074, -0.1278] },
    { name: 'To', location: [35.6895, 139.6917] },
    { name: 'M', location: [55.751244, 37.618423] },
];
findFastestCity(cities)
    .then(clisestCity => {
        console.log(clisestCity);//ожидаемый результат: название ближайшнго города
    })
    .catch(error=>{
        console.log(error.message);
    });