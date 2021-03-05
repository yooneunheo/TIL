
#include "string_tools.h"

int read_line(FILE *fp, char str[], int n) {
    int ch, i=0;
		while ((ch=fgetc(fp) != '\n' && ch != EOF) 
		// 파일 포인터가 가리키는 파일로부터 문자 하나를 읽어서 ch라는 정수형 변수에 저장한 다음, 그것이 \n도 아니고 EOF도 아니면 중단되게
			if(i<n-1) // str[]에 저장할 데이터의 개수가 str 배열의 크기인 n을 넘지 말아야 하므로
				str[i++] = ch;

		str[i] = '\0';
		return i;
}	