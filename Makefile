# === Sam shortcut
# next lines are autogenerated and any changes will be discarded after regenerating
CRYSTAL_BIN ?= `which crystal`
SAM_PATH ?= "src/sam.cr"
PORT=3001
.PHONY: sam old_sam tabster clean_bin shards_build

bin:
	mkdir -p bin

clean_bin:
	rm -rf ./bin

shards_build: clean_bin bin
	shards build

old_sam:
	$(CRYSTAL_BIN) run $(SAM_PATH) -- $(filter-out $@,$(MAKECMDGOALS))

sam: shards_build
	./bin/sam $(filter-out $@,$(MAKECMDGOALS))

tabster: shards_build
	./bin/tabster --port $(PORT)

%:
	@:
# === Sam shortcut
