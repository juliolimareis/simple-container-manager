const command = {
	listContainers: "echo -e \"{password}\" | sudo -S docker container ls -a",
	startContainer: "echo -e \"{password}\n\" | sudo -S docker container start {id}",
	stopContainer: "echo -e \"{password}\n\" | sudo -S docker container stop {id}",
	removeContainer: "echo -e \"{password}\n\" | sudo -S docker container rm {id}",
	pruneContainer: "echo -e \"{password}\n\" | sudo -S docker container prune -y",
	pruneNetwork: "echo -e \"{password}\n\" | sudo -S docker network prune -y",
	logs: "echo -e \"{password}\n\" | sudo -S docker logs --tail 1000 -f {id}",
	test: "firefox",
}
export default command