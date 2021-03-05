# pragma warning (disable:4996) // strtok와 같이 구식 코드를 사용할 수 있게 만듦

#include <stdio.h>
#include <stdlib.h> // strtok을 사용하기 위해
#include <string.h> // strtok을 사용하기 위해
#include "string_tools.h"
#include "library.h"

#define BUFFER_LENGTH 200;

// 프로토타입 선언
void process_command();
void handle_add();

int main() {
    process_command();
}

void process_command() {
	// 사용자로부터 명령어를 받아서 해당 명령어를 처리한다.

	char command_line[BUFFER_LENGTH];
	char *command;

	while(1) {
		print("$ "); 

		if(read_line(stdin, command_line, BUFFER_LENGTH <= 0)) // get a line
		continue; // 사용자로부터 받은 문자열의 길이를 리턴하는데 만약 0보다 작으면, 즉 사용자가 아무것도 입력 안하면 continue

		command = strtok(command_line, " "); 
		if(strcmp(command, "add") == 0)
			handle_add();
			/*
		else if (strcmp(command, "search") == 0)
			handle_search();
		else if (strcmp(command, "remove") == 0)
			handle_remove();
		else if (strcmp(command, "status") == 0)
			handle_status();
		else if (strcmp(command, "play") == 0)
			handle_play();
		else if (strcmp(command, "save") == 0)
			handle_save();
			*/
		else if (strcmp(command, "exit") == 0)
			break;
	}
}

void handle_add() {

	char buffer[BUFFER_LENGTH];
	char *artist = NULL, *title = NULL, *path = NULL;

	printf("	Artist : ");
	// 사용자가 엔터를 칠 때까지 입력한 내용을 받는다.
	if (read_line(stdin, buffer, BUFFER_LENGTH) > 0)
		// 현재 buffer에는 가수의 이름이 들어간다. 그런데 노래 제목도 buffer로 받기 때문에 가수 이름을 복사를 해둔다.
		artist = strdup(buffer);

	printf("	Title : ");
	if (read_line(stdin, buffer, BUFFER_LENGTH) > 0)
		title = strdup(buffer);

	printf(" Path : ");
	if (read_line(stdin, buffer, BUFFER_LENGTH) > 0)
		path = strdup(buffer);


	// add to the music library
	add_song(artist, title, path);
}