#include <iostream>
#include <cstdlib> // 用于 atoi

int main(int argc, char* argv[]) {
    // 默认值设为 0
    int num = 0;
    
    // 如果启动时传入了参数（比如 outDebug.exe 5），则取第一个参数
    if (argc > 1) {
        num = std::atoi(argv[1]);
    }
    
    // 核心计算：平方
    int result = num * num;
    
    // 关键：将结果打印到控制台，Node.js 会捕获这行内容
    std::cout << result;
    
    return 0;
}