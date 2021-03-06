# === Sam shortcut
# next lines are autogenerated and any changes will be discarded after regenerating
CRYSTAL_BIN ?= `which crystal`
SAM_PATH ?= "src/sam.cr"
PORT=3000
.PHONY: clean build sam server tabster

bin:
	mkdir -p bin

clean:
	rm -rf ./bin

build: clean bin
	shards build

sam:
	./bin/sam $(filter-out $@,$(MAKECMDGOALS))

server:
	./bin/tabster --port $(PORT)

tabster: build server

%:
	@:
# === Sam shortcut
