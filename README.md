**Задание 2. «Сокращатель ссылок»**

Предположим, мы хотим написать свой собственный сокращатель ссылок (такой,
как bit.ly), и попросили вас написать API, который будет реализовывать
основную функциональность сервиса.

Для пользователя должны быть доступны следующие возможности:
1. Создать новую сокращенную ссылку (дать длинную, получить короткую)
2. Перейти по короткой ссылке и быть перенаправленным на исходную длинную ссылку
3. Просмотреть список «своих» ссылок, которые он сокращал
4. Просмотреть статистику переходов по каждой ссылке


*Примечание*

Если при решении этой задачи вы будете использовать БД, не забудьте приложить
в README.md инструкции по настройке выбранной вами БД для проверяющего (скрипты
создания таблиц для реляционных БД, конфиги, и прочее).

Задача довольно объемная, поэтому пользовательский интерфейс можно не делать, достаточно API с примерами запросов для каждого действия пользователя.
Пользовательский интерфейс является плюсом, но не является обязательным.

Обратите внимание на время работы основного сценария – открытия короткой ссылки
и превращения ее в длинную. После того, как приложение начнет работать корректно,
протестируйте его скорость работы при помощи утилит нагрузочного тестирования
(wrk, ab и подобных), и попробуйте оптимизировать приложение с точки зрения
скорости работы.

Зафиксируйте в README.md, как и чем тестировали, какие показатели были в начале
работы, какие в итоге, и какие шаги по оптимизации вы предпринимали.

**Запуск приложения**
1) Создать базу данных MySQL
2) Создать файл .env по типу .env.example
2) cd link_shortener_02
3) npm install
4) npm start
*Внимание!* 
*dev1* - 1й вариант
*dev2* - 2й вариант
*master* - пустой

**1й вариант**
Для хранения информации о юзере, о ссылках и переходах используется MySQL.
При переходе по короткой ссылке сервер дожидается ответа о записи информации о переходе.

*Тест wrk*
ma-daria@madaria-UX32LA:~/code/WebstormProjects/link_shortener_02$ docker run --rm williamyeh/wrk -t12 -c400 -d30s  http://192.168.1.168:3000/0tl6acn

Running 30s test @ http://192.168.1.168:3000/0tl6acn
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   590.03ms   78.38ms   1.12s    79.75%
    Req/Sec    95.57     84.57   320.00     68.30%
  19836 requests in 30.06s, 6.34MB read
Requests/sec:    659.94
Transfer/sec:    215.90KB

**2й вариант**
Для хранения информации о юзере, о ссылках и переходах используется MySQL.
При переходе по короткой ссылке сервер не дожидается ответа о записи информации о переходе.

*Тест wrk*
ma-daria@madaria-UX32LA:~/code/WebstormProjects/link_shortener_02$ docker run --rm williamyeh/wrk -t12 -c400 -d30s  http://192.168.1.168:3000/0tl6acn

Running 30s test @ http://192.168.1.168:3000/0tl6acn
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   650.52ms   96.09ms   1.12s    84.96%
    Req/Sec    82.93     80.48   323.00     79.76%
  18051 requests in 30.10s, 5.77MB read
Requests/sec:    599.74
Transfer/sec:    196.20KB