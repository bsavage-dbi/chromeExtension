import csv
import json

def file_len(fname):
    with open(fname) as f:
        for i,l in enumerate(f):
            pass
    return i+1

"""
load CSV file
"""
with open('finalAlertData.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter= ',')
    with open('alerts.json') as json_file:
        json_loader = json.load(json_file)
        success_count = 0
        failed_count = 0
        filtered_count = 0
        last_succedd = ''
        last_filtered = ''
        filters_total_lines = file_len('filter.txt')
        for row in csv_reader:
            if row[0] != 'Alert ID':
                for p in json_loader:
                    if p["alert_name"] in row[3]:
                        """
                        Uncomment if you want success alerts
                        print('SUCCESS: ', row[3], ' is in JSON')
                        print(p["alert_confluence"])
                        print('success')
                        """
                        success_count += 1
                        last_succedd = row[3]
                        break
                if row[3] != last_succedd:
                    """
                    Filters check via filter.txt, checks if failed alert was suppose to be filtered or not.
                    """
                    filters = open('filter.txt', 'r')
                    filters_count_check = 0
                    for filter in filters:
                        filter = filter[:-1]
                        if filter in row[3]:
                            last_filtered = row[3]
                            filters_count_check += 1
                            break
                        if filters_count_check == filters_total_lines -1:
                            print('FAILED: ', row[3], ' is not in JSON')
                            failed_count += 1
                        else:
                            filters_count_check += 1 
                            filtered_count += 1

            """
            Uncomment if you want to stop after 25 failed alerts
            if failed_count == 25:
                break
            """
    print('***SUMMARY***')
    print('There are ' , success_count, ' colorated lines with this JSON')
    print('There are ' , failed_count, ' alerts not in this JSON ')
    print('There are ', filtered_count, ' filetered alerts')
