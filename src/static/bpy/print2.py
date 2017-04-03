# -*- coding:utf-8 -*- 
def print2():
    print("233")

def main():
    def print2():
        print("233")
    def print1():
        print2()
    # print1.print2 = def print2():print("233")
    print1()

main()
