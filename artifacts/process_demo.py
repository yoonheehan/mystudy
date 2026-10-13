from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import multiprocessing as mp
import os
import threading
import time

def wait_for_api(number):
    time.sleep(0.03)  # 실제 통신 대신 I/O 대기를 흉내 냅니다.
    return number, os.getpid(), threading.current_thread().name

def calculate(number):
    return number * number, os.getpid()

if __name__ == "__main__":
    # 같은 프로세스 안의 스레드들이 대기 작업을 나눕니다.
    with ThreadPoolExecutor(max_workers=2) as pool:
        print("스레드:", list(pool.map(wait_for_api, [2, 3, 4, 5])))
    # 별도 Python 프로세스로 계산 작업을 전달합니다.
    with ProcessPoolExecutor(max_workers=2, mp_context=mp.get_context("spawn")) as pool:
        print("프로세스:", list(pool.map(calculate, [2, 3, 4, 5])))
