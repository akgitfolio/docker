#!/bin/bash

# Function to run a Docker container with tail -f /dev/null
run_tail() {
  docker run -d --name tail-container ubuntu tail -f /dev/null
}

# Function to run a Docker container with sleep infinity
run_sleep() {
  docker run -d --name sleep-container ubuntu sleep infinity
}

# Function to run a Docker container with an infinite loop
run_loop() {
  docker run -d --name loop-container ubuntu sh -c "while true; do sleep 1; done"
}

# Function to run a Docker container with a pseudo-TTY session
run_tty() {
  docker run -itd --name tty-container ubuntu /bin/bash
}

# Main function to execute the desired method
main() {
  echo "Choose a method to keep the Docker container running:"
  echo "1. tail -f /dev/null"
  echo "2. sleep infinity"
  echo "3. Infinite loop"
  echo "4. Pseudo-TTY session"
  read -p "Enter the number of your choice: " choice

  case $choice in
    1)
      run_tail
      ;;
    2)
      run_sleep
      ;;
    3)
      run_loop
      ;;
    4)
      run_tty
      ;;
    *)
      echo "Invalid choice. Please enter a number between 1 and 4."
      ;;
  esac
}

# Execute the main function
main