
@echo off
SET a=%~DP0
SET b=hots-parser 
SET c=%a%%b%

echo c
echo %c%

IF EXIST %c% (
	echo hots-parser detected. Trying update...
	cd .\hots-parser\
	git  update-git-for-windows
    	rem file exists

) else (
	echo hots-parser folder NOT DETECTED. Cloning Hots-parser git repository...
	git clone https://github.com/ebshimizu/hots-parser.git
	cd .\hots-parser\
	echo installing nodejs code...
	npm install
    	rem file doesn't exist
)
