fetch:
	cd ./server && npm install && cd ../client && npm install

frontend:
	cd ./client && npm install && npm run build

backend:
	cd ./server && npm start

all:
	cd ./server && npm start && cd ../client && npm install && npm run build

run:
	cd ./server && npm start & cd ../client && npm start

runb:
	cd ./server && npm start

runf:
	cd ./client && npm start

clean:
	rm -rf ./server/build && cd ../client && rm -rf ./build
