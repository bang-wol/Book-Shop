INSERT INTO books
    (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES
    ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books
    (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES
    ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO books
    (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES
    ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO books
    (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES
    ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");

INSERT INTO likes
    (user_id, liked_book_id)
VALUES
    (1, 4);

INSERT INTO cartItems
    (book_id, quantity, user_id)
VALUES(1, 1, 1)

INSERT INTO delivery
    (address, receiver,contact)
VALUES
    ("서울시 강남구", "김언주", "010-3303-9999")

INSERT INTO orders
    (book_title, total_quantity, total_price, user_id, delivery_id)
VALUES("어린왕자들", 3, 6000, 1, 1)

INSERT INTO orderedBook
    (order_id, book_id, quantity)
VALUES(1, 1, 1)
INSERT INTO orderedBook
    (order_id, book_id, quantity)
VALUES(1, 3, 2)

select max(id)
from delivery
